import {
    when,
    match
} from "../src";

describe("Patter matching tests", () => {
    it("Should return a pattern when combining a condition and an execution", () => {
        // Arrange
        const condition = (x: number) => true;
        const execution = (x: number) => x.toString(); 

        const expected = {
            condition,
            execution,
        }

        // Act
        const actual= when(condition)(execution);

        // Assert
        expect(actual).toEqual(expected);
    });

    it("Should return a result when a pattern is matched", () => {
        // Arrange
        const expected = 42;

        // Act
        const actual = match(1337)(
            when((v) => v === 42)(v => 1337),
            when((v) => v === 1337)(v => 42)
        )();

        // Assert
        expect(actual).toEqual(expected);
    });

    it("Should return a default result when no patterns are matched and a wildcare is defined", () => {
        // Arrange
        const expected = "9";

        // Act
        const actual = match(1)(
            when((v) => v === 42)(v => "1337"),
            when((v) => v === 1337)(v => "42")
        )(_ => "9");

        // Assert
        expect(actual).toEqual(expected);
    });

    it("Should return an error when no patterns are matched and no wildcare is defined", () => {
        expect(() => {
            const result = match(1)(
                when(v => v === 42)(v => 1337),
                when(v => v === 1337)(v => 42)
            )()
        }).toThrowError("Error: No pattern matched. Please use a wildcard pattern.");
    })
});