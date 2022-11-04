import {test, beforeEach} from "tap";
import {MetaValidator} from "../../src/MetaValidator.js";
import {IsValid} from "../../src/decorators/property/IsValid.js";

beforeEach(MetaValidator.clearMetadata);

void test("decorators.IsValid() is always valid", async t => {
    class Widget {
        @IsValid()
        name: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: "Doodad"});
    const validationErrors = await new MetaValidator().validate(widget);
    t.equal(Object.keys(validationErrors).length, 0);
});
