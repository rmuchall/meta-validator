import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {isAlpha} from "../../src/validators/is-alpha.js";
import {IsAlpha} from "../../src/decorators/property/IsAlpha.js";

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

void test("functions.isAlpha() valid values", t => {
    for (const value of validValues) {
        if (!isAlpha(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        t.ok(isAlpha(value), `value = ${value}`);
    }

    t.end();
});

void test("functions.isAlpha() invalid values", t => {
    for (const value of invalidValues) {
        if (isAlpha(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        t.notOk(isAlpha(value), `value = ${value}`);
    }

    t.end();
});

void test("decorators.IsAlpha() valid values", async t => {
    class Widget {
        @IsAlpha()
        name: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("decorators.IsAlpha() invalid values", async t => {
    class Widget {
        @IsAlpha()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
