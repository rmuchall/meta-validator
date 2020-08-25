import {MetaValidator} from "../../src/MetaValidator";
import {isIp} from "../../src/validators/is-ip";
import {IsIp} from "../../src/decorators/property/IsIp";

const validValues: any[] = [
    "127.0.0.1",
    "0.0.0.0",
    "255.255.255.255",
    "1.2.3.4",
    "::1",
    "2001:db8:0000:1:1:1:1:1",
    "2001:41d0:2:a141::1",
    "::ffff:127.0.0.1",
    "::0000",
    "0000::",
    "1::",
    "1111:1:1:1:1:1:1:1",
    "fe80::a6db:30ff:fe98:e946",
    "::",
    "::ffff:127.0.0.1",
    "0:0:0:0:0:ffff:127.0.0.1",
];

const invalidValues: any[] = [
    "abc",
    "256.0.0.0",
    "0.0.0.256",
    "26.0.0.256",
    "0200.200.200.200",
    "200.0200.200.200",
    "200.200.0200.200",
    "200.200.200.0200",
    "::banana",
    "banana::",
    "::1banana",
    "::1::",
    "1:",
    ":1",
    ":1:1:1::2",
    "1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1",
    "::11111",
    "11111:1:1:1:1:1:1:1",
    "2001:db8:0000:1:1:1:1::1",
    "0:0:0:0:0:0:ffff:127.0.0.1",
    "0:0:0:0:ffff:127.0.0.1",
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isIp() valid values", () => {
    for (const value of validValues) {
        if (!isIp(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isIp(value)).toBeTruthy();
    }
});

test("functions.isIp() invalid values", () => {
    for (const value of invalidValues) {
        if (isIp(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isIp(value)).toBeFalsy();
    }
});

test("decorators.IsIp() valid values", async () => {
    class Widget {
        @IsIp()
        ipAddress: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {ipAddress: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsIp() invalid values", async () => {
    class Widget {
        @IsIp()
        ipAddress: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {ipAddress: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
