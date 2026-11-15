import { TLink } from "@/components/Shell";
import { View } from "@/components/View";

export default function NotFound() {
  return (
    <View className="mid">
      <div className="lost">
        <h1 data-in>That page does not exist.</h1>
        <p className="lede" data-in>
          The link may be old. Everything on this site is one click from the start.
        </p>
        <div data-in>
          <TLink href="/" className="btn btn-solid">
            Go to the start
          </TLink>
        </div>
      </div>
    </View>
  );
}
