import t from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsString} from "../../src/decorators/property/IsString.js";
import {IsNotEqualTo} from "../../src/decorators/property/IsNotEqualTo.js";

t.beforeEach(MetaValidator.clearMetadata);

void t.test("decorators.IsNotEqualTo() valid value", async t => {
    class Widget {
        @IsString()
        topColor: string;

        @IsNotEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Red"});
    const validationErrors = await new MetaValidator().validate(widget);
    t.equal(Object.keys(validationErrors).length, 0);
});

void t.test("decorators.IsNotEqualTo() invalid value", async t => {
    class Widget {
        @IsString()
        topColor: string;

        @IsNotEqualTo("topColor")
        bottomColor: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {topColor: "Blue", bottomColor: "Blue"});
    const validationErrors = await new MetaValidator().validate(widget);
    t.equal(Object.keys(validationErrors).length, 1);
});
