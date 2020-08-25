import {MetaValidator} from "../../src/MetaValidator";
import {isEmpty} from "../../src/validators/is-empty";
import {IsEmpty} from "../../src/decorators/property/IsEmpty";

const validValues: any[] = [
    1234,
    true,
    "",
    {},
    undefined,
    null
];

const invalidValues: any[] = [
    "xxx",
    {test: 1234}
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isEmpty() valid values", () => {
    for (const value of validValues) {
        if (!isEmpty(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isEmpty(value)).toBeTruthy();
    }
});

test("functions.isEmpty() invalid values", () => {
    for (const value of invalidValues) {
        if (isEmpty(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isEmpty(value)).toBeFalsy();
    }
});

test("decorators.IsEmpty() valid values", async () => {
    class Widget {
        @IsEmpty()
        name: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsEmpty() invalid values", async () => {
    class Widget {
        @IsEmpty()
        name: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
