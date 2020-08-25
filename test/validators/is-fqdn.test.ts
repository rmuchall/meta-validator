import {MetaValidator} from "../../src/MetaValidator";
import {isFqdn} from "../../src/validators/is-fqdn";
import {IsFqDn} from "../../src/decorators/property/IsFqDn";

const validValues: any[] = [
    'domain.com',
    'dom.plato',
    'a.domain.co',
    'foo--bar.com',
    'xn--froschgrn-x9a.com',
    'rebecca.blackfriday',
];

const invalidValues: any[] = [
    'abc',
    '256.0.0.0',
    '_.com',
    '*.some.com',
    's!ome.com',
    'domain.com/',
    '/more.com',
    'domain.com�',
    'domain.com©',
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isFqDn() valid values", () => {
    for (const value of validValues) {
        if (!isFqdn(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isFqdn(value)).toBeTruthy();
    }
});

test("functions.isFqDn() invalid values", () => {
    for (const value of invalidValues) {
        if (isFqdn(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isFqdn(value)).toBeFalsy();
    }
});

test("decorators.IsFqDn() valid values", async () => {
    class Widget {
        @IsFqDn()
        domainName: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {domainName: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsFqDn() invalid values", async () => {
    class Widget {
        @IsFqDn()
        domainName: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {domainName: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
