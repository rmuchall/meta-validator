import {MetaValidator} from "../../src/MetaValidator";
import {isString} from "../../src/validators/is-string";
import {IsString} from "../../src/decorators/property/IsString";

const validValues: any[] = [
    "abc",
    "ABC",
    "FoObar",
    "",
    String("test")
];

const invalidValues: any[] = [
    42,
    true,
    {},
    null,
    undefined
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isString() valid values", () => {
    for (const value of validValues) {
        if (!isString(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isString(value)).toBeTruthy();
    }
});

test("functions.isString() invalid values", () => {
    for (const value of invalidValues) {
        if (isString(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isString(value)).toBeFalsy();
    }
});

test("decorators.IsString() valid values", async () => {
    class Widget {
        @IsString()
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsString() invalid values", async () => {
    class Widget {
        @IsString()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
