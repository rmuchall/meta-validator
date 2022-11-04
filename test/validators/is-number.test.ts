import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {isNumber} from "../../src/validators/is-number.js";
import {IsNumber} from "../../src/decorators/property/IsNumber.js";

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

void test("functions.isNumber() valid values", t => {
    for (const value of validValues) {
        if (!isNumber(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        t.ok(isNumber(value), `value = ${value}`);
    }

    t.end();
});

void test("functions.isNumber() invalid values", t => {
    for (const value of invalidValues) {
        if (isNumber(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        t.notOk(isNumber(value), `value = ${value}`);
    }

    t.end();
});

void test("decorators.IsNumber() valid values", async t => {
    class Widget {
        @IsNumber()
        model: any;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {model: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("decorators.IsNumber() invalid values", async t => {
    class Widget {
        @IsNumber()
        model: any;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {model: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
