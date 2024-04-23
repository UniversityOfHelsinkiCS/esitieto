import React from 'react';
import { CourseActivityDesc, findActivityPeriodDesc } from "./CourseActivityDesc";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe("findActivityPeriodDesc unit testing", () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

    test("if text prop doesn't contain right keywords in titles it returns a blank list", () => {
        const mockText = "text"
        expect(findActivityPeriodDesc(mockText)).toEqual(['', ''])
    })

    test("if text prop contains activity info, the function returns this info as string", () => {
        const mockText = "<h5>Järjestämisajankohta opetusperiodin tarkkuudella</h5><p>1. periodi joka vuosi</p>" +
        "<h5>Suositeltava suoritusajankohta tai - vaihe</h5><p>1. vuosi matematiikan pääaineopinnoissa</p>"
        const result = findActivityPeriodDesc(mockText)
        expect(result[0].trim()).toEqual('1. periodi joka vuosi')
        expect(result[1].trim()).toEqual('1. vuosi matematiikan pääaineopinnoissa')
    })
})

describe("CourseActivityDesc unit testing", () => {

    beforeEach(() => {
        jest.clearAllMocks();
      });

    test("if function receives blank/undefined desc, nothing renders", () => {
        const mockDesc = ''
        render(<CourseActivityDesc desc={mockDesc}/>)
        const title = screen.queryByText("Suoritusaika")
        expect(title).toBe(null)
    })


    test("if function receives desc with activity info, the activity info gets rendered", () => {

        const mockDesc = "<h5>Suoritustavat</h5><p>Osallistuminen lähiopetukseen ja/tai tentti.<br /></p>" +
        "<h5>Järjestämisajankohta opetusperiodin tarkkuudella</h5><p>1. periodi joka vuosi</p>" +
        "<h5>Suositeltava suoritusajankohta tai - vaihe</h5><p>1. vuosi matematiikan pääaineopinnoissa</p>" +
        "<h5>Opintokokonaisuus</h5><p>MAT110 Matematiikan perusopinnot</p>";
        render(<CourseActivityDesc desc={mockDesc}/>);
        
        const title = screen.queryByText("Suoritusaika");
        expect(title).toBeInTheDocument();
        expect(title.tagName).toBe("H3");

        fireEvent.click(screen.getByTestId("infoIcon"));

        const activity = screen.queryByText("1. periodi joka vuosi");
        expect(activity).toBeInTheDocument();

        const recommendation = screen.queryByText("1. vuosi matematiikan pääaineopinnoissa");
        expect(recommendation).toBeInTheDocument();
    });
});