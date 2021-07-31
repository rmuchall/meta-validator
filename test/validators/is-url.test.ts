import {MetaValidator} from "../../src/MetaValidator";
import {isUrl} from "../../src/validators/is-url";
import {IsUrl} from "../../src/decorators/property/IsUrl";

const validValues: any[] = [
    "http://foobar.com",
    "https://www.foobar.com",
    "ftp://foobar.com/",
    "http://valid.au",
    "http://www.foobar.com/",
    "HTTP://WWW.FOOBAR.COM/",
    "https://www.foobar.com/",
    "HTTPS://WWW.FOOBAR.COM/",
    "http://www.foobar.com:23/",
    "http://www.foobar.com:65535/",
    "http://www.foobar.com:5/",
    "https://www.foobar.com/",
    "ftp://www.foobar.com/",
    "http://www.foobar.com/~foobar",
    "http://user:pass@www.foobar.com/",
    "http://user:@www.foobar.com/",
    "http://127.0.0.1/",
    "http://10.0.0.0/",
    "http://189.123.14.13/",
    "http://duckduckgo.com/?q=%2F",
    "http://foobar.com/t$-_.+!*\"(),",
    "http://foobar.com/?foo=bar#baz=qux",
    "http://foobar.com?foo=bar",
    "http://foobar.com#baz=qux",
    "http://www.xn--froschgrn-x9a.net/",
    "http://xn--froschgrn-x9a.com/",
    "http://foofoo--bar.com",
    "http://høyfjellet.no",
    "http://xn--j1aac5a4g.xn--j1amh",
    "http://xn------eddceddeftq7bvv7c4ke4c.xn--p1ai",
    "http://кулік.укр",
    "https://test.com?ref=http://test2.com",
    "http://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:80/index.html",
    "http://[1080:0:0:0:8:800:200C:417A]/index.html",
    "http://[3ffe:2a00:100:7031::1]",
    "http://[1080::8:800:200C:417A]/foo",
    "http://[::192.9.5.5]/ipng",
    "http://[::FFFF:129.144.52.38]:80/index.html",
    "http://[2010:836B:4179::836B:4179]",
    "http://example.com/example.json#/foo/bar"
];

const invalidValues: any[] = [
    "//foobar.com",
    "flip://foobar.com",
    "invalid/",
    "invalid.x",
    "invalid.",
    ".com",
    "httpxx://com/",
    "http://300.0.0.1/",
    "mailto:foo@bar.com",
    "rtmp://foobar.com",
    "http://www.xn--.com/",
    "http://xn--.com/",
    "http://www.foobar.com:0/",
    "http://www.foobar.com:70000/",
    "blargle://www.foobar.com:99999/",
    "http://www.-foobar.com/",
    "http://www.foobar-.com/",
    "http://foobar/# lol",
    "http://foobar/? lol",
    "http://foobar/ lol/",
    // "http://lol @foobar.com/",
    // "http://lol:lol @foobar.com/",
    // "http://lol:lol:lol@foobar.com/",
    // "http://lol: @foobar.com/",
    "http://www.foo_bar.com/",
    "http://www.foobar.com/\t",
    "http://\n@www.foobar.com/",
    `http://foobar.com/${new Array(2083).join("f")}`,
    "http://*.foo.com",
    "*.foo.com",
    "!.foo.com",
    // "http://example.com.",
    "http://localhost:61500this is an invalid url!!!!",
    "////foobar.com",
    "http:////foobar.com",
    "https://example.com/foo/<script>alert(\"XSS\")</script>/",
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isUrl() valid values", () => {
    for (const value of validValues) {
        if (!isUrl(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isUrl(value)).toBeTruthy();
    }
});

test("functions.isUrl() invalid values", () => {
    for (const value of invalidValues) {
        if (isUrl(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isUrl(value)).toBeFalsy();
    }
});

test("decorators.IsUrl() valid values", async () => {
    class Widget {
        @IsUrl()
        website: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {website: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsUrl() invalid values", async () => {
    class Widget {
        @IsUrl()
        website: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {website: value});
        const validationErrors = await new MetaValidator().validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
