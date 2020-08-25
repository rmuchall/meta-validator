import {MetaValidator} from "../../src/MetaValidator";
import {isEmail} from "../../src/validators/is-email";
import {IsEmail} from "../../src/decorators/property/IsEmail";

function repeatString(str: string, count: number) {
    let result = "";
    for (; count; count--) {
        result += str;
    }

    return result;
}

const validValues: any[] = [
    "foo@bar.com",
    "x@x.au",
    "foo@bar.com.au",
    "foo+bar@bar.com",
    "hans.m端ller@test.com",
    "hans@m端ller.com",
    "test|123@m端ller.com",
    "test123+ext@gmail.com",
    "some.name.midd.leNa.me+extension@GoogleMail.com",
    '"foobar"@example.com',
    '"  foo  m端ller "@example.com',
    '"foo\\@bar"@example.com',
    `${repeatString("a", 64)}@${repeatString("a", 63)}.com`,
    `${repeatString("a", 64)}@${repeatString("a", 63)}.com`,
    `${repeatString("a", 31)}@gmail.com`,
    "test@gmail.com",
    "test.1@gmail.com",
];

const invalidValues: any[] = [
    "invalidemail@",
    "invalid.com",
    "@invalid.com",
    "foo@bar.com.",
    // "somename@ｇｍａｉｌ.com",
    "foo@bar.co.uk.",
    "z@co.c",
    // "ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com",
    // `${repeatString("a", 64)}@${repeatString("a", 251)}.com`,
    // `${repeatString("a", 65)}@${repeatString("a", 250)}.com`,
    // `${repeatString("a", 64)}@${repeatString("a", 64)}.com`,
    // `${repeatString("a", 64)}@${repeatString("a", 63)}.${repeatString("a", 63)}.${repeatString("a", 63)}.${repeatString("a", 58)}.com`,
    "test1@invalid.co m",
    "test2@invalid.co m",
    "test3@invalid.co m",
    "test4@invalid.co m",
    "test5@invalid.co m",
    "test6@invalid.co m",
    "test7@invalid.co m",
    "test8@invalid.co m",
    "test9@invalid.co m",
    "test10@invalid.co m",
    "test11@invalid.co m",
    "test12@invalid.co　m",
    "test13@invalid.co　m",
    "multiple..dots@stillinvalid.com",
    "test123+invalid! sub_address@gmail.com",
    "gmail...ignores...dots...@gmail.com",
    "ends.with.dot.@gmail.com",
    "multiple..dots@gmail.com",
    'wrong()[]",:;<>@@gmail.com',
    '"wrong()[]",:;<>@@gmail.com',
    // 'username@domain.com�',
    // 'username@domain.com©',
    "",
    {},
    undefined,
    null
];

beforeEach(MetaValidator.clearMetadata);

test("functions.isEmail() valid values", () => {
    for (const value of validValues) {
        if (!isEmail(value)) {
            throw new Error(`${JSON.stringify(value)} is false`);
        }

        expect(isEmail(value)).toBeTruthy();
    }
});

test("functions.isEmail() invalid values", () => {
    for (const value of invalidValues) {
        if (isEmail(value)) {
            throw new Error(`${JSON.stringify(value)} is true`);
        }

        expect(isEmail(value)).toBeFalsy();
    }
});

test("decorators.IsEmail() valid values", async () => {
    class Widget {
        @IsEmail()
        email: string;
    }

    for (const value of validValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {email: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(0);
    }
});

test("decorators.IsEmail() invalid values", async () => {
    class Widget {
        @IsEmail()
        email: string;
    }

    for (const value of invalidValues) {
        const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {email: value});
        const validationErrors = await MetaValidator.validate(widget);
        expect(Object.keys(validationErrors).length).toBe(1);
    }
});
