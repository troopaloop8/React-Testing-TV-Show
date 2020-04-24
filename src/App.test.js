import React from "react";
import App from "./App";
import { render, fireEvent, waitFor, screen, findByText } from "@testing-library/react";
import { FetchShow as mockFetchShow } from "./api/fetchShow";
import Dropdown from 'react-dropdown';

jest.mock("./api/fetchShow");

const mockData = [
    {
        "id":578666,
        "url":"http://www.tvmaze.com/episodes/578666/stranger-things-1x05-chapter-five-the-flea-and-the-acrobat",
        "name":"Chapter Five: The Flea and the Acrobat",
        "season":1,
        "number":5,
        "airdate":"2016-07-15",
        "airtime":"",
        "airstamp":"2016-07-15T12:00:00+00:00",
        "runtime":60,
        "image":{
           "medium":"http://static.tvmaze.com/uploads/images/medium_landscape/67/168922.jpg",
           "original":"http://static.tvmaze.com/uploads/images/original_untouched/67/168922.jpg"
        },
        "summary":"<p>Jim searches for Will at Hawkins Laboratory, but finds something unexpected. Meanwhile, Lonnie helps Joyce bury Will but reveals an ulterior motive for returning to town, while the boys find a way to locate Will but discover that Jane is opposing them.</p>",
        "_links":{
           "self":{
              "href":"http://api.tvmaze.com/episodes/578666"
           }
        }
     },
     {
        "id":578664,
        "url":"http://www.tvmaze.com/episodes/578664/stranger-things-1x03-chapter-three-holly-jolly",
        "name":"Chapter Three: Holly, Jolly",
        "season":1,
        "number":3,
        "airdate":"2016-07-15",
        "airtime":"",
        "airstamp":"2016-07-15T12:00:00+00:00",
        "runtime":60,
        "image":{
           "medium":"http://static.tvmaze.com/uploads/images/medium_landscape/67/168920.jpg",
           "original":"http://static.tvmaze.com/uploads/images/original_untouched/67/168920.jpg"
        },
        "summary":"<p>While Nancy looks for a missing Barbara and realizes that Jonathan may have been the last person to see her, Mike and his friends go out with Jane to find the missing Will. Meanwhile, Jim tracks Will to the lab.</p>",
        "_links":{
           "self":{
              "href":"http://api.tvmaze.com/episodes/578664"
           }
        }
     }
]

test('displays loading message', async() => {
	const { getByTestId } = render(<App />);
	expect(getByTestId('loading').textContent).toBe('Fetching data...');
});

test('renders episodes from API', async () => {
	mockFetchShow.mockResolvedValueOnce(mockData);
	render(<Dropdown />);
	expect(screen.getByText(/Select.../i)).toBeInTheDocument();
	const fetchEpisodesButton = screen.getByText(/Select.../i);
	fireEvent.click(fetchEpisodesButton);
	  
	expect(mockFetchShow).toHaveBeenCalledTimes(1);
	// const select = screen.getByText(/Season 1/i);
	// await wait(() => expect(select.toBeInTheDocument()));
})