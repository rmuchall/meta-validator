import {MetaValidator} from "../../src/MetaValidator";
import {isAlphanumeric} from "../../src/validators/is-alphanumeric";
import {IsAlphanumeric} from "../../src/decorators/property/IsAlphanumeric";

const validValues: any[] = [
    "abc",
    "ABC",
    "1234",
    "abc1234",
    "ABC1234"
];

const invalidValues: any[] = [
    42,
    true,
    "abc!@#",
    "ABC!@#",
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isString() valid values", () => {
    for (const value of validValues) {
        if (!isAlphanumeric(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isAlphanumeric(value)).toBeTruthy();
    }
});

test("functions.isString() invalid values", () => {
    for (const value of invalidValues) {
        if (isAlphanumeric(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isAlphanumeric(value)).toBeFalsy();
    }
});

test("decorators.IsString() valid values", async () => {
    class Widget {
        @IsAlphanumeric()
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
        @IsAlphanumeric()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
