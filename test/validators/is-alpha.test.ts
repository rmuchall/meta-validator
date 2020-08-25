import {MetaValidator} from "../../src/MetaValidator";
import {isAlpha} from "../../src/validators/is-alpha";
import {IsAlpha} from "../../src/decorators/property/IsAlpha";

const validValues: any[] = [
    "abc",
    "ABC",
    "FoObar"
];

const invalidValues: any[] = [
    "abc1",
    "  foo  ",
    "ÄBC",
    "FÜübar",
    "Jön",
    "Heiß",
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isAlpha() valid values", () => {
    for (const value of validValues) {
        if (!isAlpha(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isAlpha(value)).toBeTruthy();
    }
});

test("functions.isAlpha() invalid values", () => {
    for (const value of invalidValues) {
        if (isAlpha(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isAlpha(value)).toBeFalsy();
    }
});

test("decorators.IsAlpha() valid values", async () => {
    class Widget {
        @IsAlpha()
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsAlpha() invalid values", async () => {
    class Widget {
        @IsAlpha()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
