import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {isRegEx} from "../../src/validators/is-reg-ex.js";
import {IsRegEx} from "../../src/decorators/property/IsRegEx.js";

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

void test("functions.isRegEx() valid values", t => {
    for (const value of validValues) {
        if (!isRegEx(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        t.ok(isRegEx(value), `value = ${value}`);
    }

    t.end();
});

void test("functions.isRegEx() invalid values", t => {
    for (const value of invalidValues) {
        if (isRegEx(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        t.notOk(isRegEx(value), `value = ${value}`);
    }

    t.end();
});

void test("decorators.IsRegEx() valid values", async t => {
    class Widget {
        @IsRegEx()
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("invalid values", async t => {
    class Widget {
        @IsRegEx()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
