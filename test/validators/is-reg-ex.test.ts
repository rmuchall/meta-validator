import {MetaValidator} from "../../src";
import {isRegEx} from "../../src/validators/is-reg-ex";
import {IsRegEx} from "../../src/decorators/property/IsRegEx";

const validValues: any[] = [
    "xxx",
    "(xxx|yyy|zzz)"
];

const invalidValues: any[] = [
    "(()",
    "",
    {},
    null,
    undefined
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isRegEx() valid values", () => {
    for (const value of validValues) {
        if (!isRegEx(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isRegEx(value)).toBeTruthy();
    }
});

test("functions.isRegEx() invalid values", () => {
    for (const value of invalidValues) {
        if (isRegEx(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isRegEx(value)).toBeFalsy();
    }
});

test("decorators.IsRegEx() valid values", async () => {
    class Widget {
        @IsRegEx()
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("invalid values", async () => {
    class Widget {
        @IsRegEx()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
