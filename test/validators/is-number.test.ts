import {MetaValidator} from "../../src/MetaValidator";
import {isNumber} from "../../src/validators/is-number";
import {IsNumber} from "../../src/decorators/property/IsNumber";

const validValues: any[] = [
    1234,
    "1234"
];

const invalidValues: any[] = [
    true,
    "test",
    "",
    {},
    null,
    undefined
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isNumber() valid values", () => {
    for (const value of validValues) {
        if (!isNumber(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isNumber(value)).toBeTruthy();
    }
});

test("functions.isNumber() invalid values", () => {
    for (const value of invalidValues) {
        if (isNumber(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isNumber(value)).toBeFalsy();
    }
});

test("decorators.IsNumber() valid values", async () => {
    class Widget {
        @IsNumber()
        model: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {model: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsNumber() invalid values", async () => {
    class Widget {
        @IsNumber()
        model: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {model: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
