import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {isFqdn} from "../../src/validators/is-fqdn.js";
import {IsFqDn} from "../../src/decorators/property/IsFqDn.js";

const validValues: any[] = [
    "domain.com",
    "dom.plato",
    "a.domain.co",
    "foo--bar.com",
    "xn--froschgrn-x9a.com",
    "rebecca.blackfriday",
];

const invalidValues: any[] = [
    "abc",
    "256.0.0.0",
    "_.com",
    "*.some.com",
    "s!ome.com",
    "domain.com/",
    "/more.com",
    "domain.com�",
    "domain.com©",
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

void test("functions.isFqDn() valid values", t => {
    for (const value of validValues) {
        if (!isFqdn(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        t.ok(isFqdn(value), `value = ${value}`);
    }

    t.end();
});

void test("functions.isFqDn() invalid values", t => {
    for (const value of invalidValues) {
        if (isFqdn(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        t.notOk(isFqdn(value), `value = ${value}`);
    }

    t.end();
});

void test("decorators.IsFqDn() valid values", async t => {
    class Widget {
        @IsFqDn()
        domainName: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {domainName: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 0, `value = ${value}`);
    }
});

void test("decorators.IsFqDn() invalid values", async t => {
    class Widget {
        @IsFqDn()
        domainName: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {domainName: value});
        const validationErrors = await new MetaValidator().validate(widget);
        t.equal(Object.keys(validationErrors).length, 1, `value = ${value}`);
    }
});
