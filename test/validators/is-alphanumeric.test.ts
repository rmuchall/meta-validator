import t from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {isAlphanumeric} from "../../src/validators/is-alphanumeric.js";
import {IsAlphanumeric} from "../../src/decorators/property/IsAlphanumeric.js";

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

t.beforeEach(MetaValidator.clearMetadata);

void t.test("functions.isString() valid values", t => {
    for (const value of validValues) {
        if (!isAlphanumeric(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        t.ok(isAlphanumeric(value), `value = ${value}`);
    }

    t.end();
});

void t.test("functions.isString() invalid values", t => {
    for (const value of invalidValues) {
        if (isAlphanumeric(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        t.notOk(isAlphanumeric(value), `value = ${value}`);
    }

    t.end();
});

void t.test("decorators.IsString() valid values", async t => {
    class Widget {
        @IsAlphanumeric()
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
        @IsAlphanumeric()
        name: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
