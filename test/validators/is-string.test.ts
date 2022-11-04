import t from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {isString} from "../../src/validators/is-string.js";
import {IsString} from "../../src/decorators/property/IsString.js";

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

t.beforeEach(MetaValidator.clearMetadata);

void t.test("functions.isString() valid values", t => {
    for (const value of validValues) {
        if (!isString(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        t.ok(isString(value), `value = ${value}`);
    }

    t.end();
});

void t.test("functions.isString() invalid values", t => {
    for (const value of invalidValues) {
        if (isString(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        t.notOk(isString(value), `value = ${value}`);
    }

    t.end();
});

void t.test("decorators.IsString() valid values", async t => {
    class Widget {
        @IsString()
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void t.test("decorators.IsString() invalid values", async t => {
    class Widget {
        @IsString()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
