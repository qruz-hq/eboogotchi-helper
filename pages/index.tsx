import { SpriteAnimator } from "react-sprite-animator";

export default function Eboogotchi() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <SpriteAnimator sprite="/images/eboogotchi.png" width={196} height={196} fps={4} startFrame={0} frameCount={2}/>
    </div>
  );
}
