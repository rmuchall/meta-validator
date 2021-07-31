import {MetaValidator} from "../../src/MetaValidator";
import {IsValid} from "../../src/decorators/property/IsValid";

beforeEach(MetaValidator.clearMetadata);

test("decorators.IsValid() is always valid", async () => {
    class Widget {
        @IsValid()
        name: string;
    }

    const widget: Widget = Object.assign<Widget, Widget>(new Widget(), {name: "Doodad"});
    const validationErrors = await new MetaValidator().validate(widget);
    expect(Object.keys(validationErrors).length).toBe(0);
});
