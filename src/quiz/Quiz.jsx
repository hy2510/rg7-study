import "./fonts/custom-font.scss";
import {
  ListeningActivity1,
  ListeningActivity2,
  ListeningActivity3,
  ListeningActivity4,
} from "./activity/ListeningActivity";
import {
  VocabularyPractice1,
  VocabularyPractice2,
  VocabularyPractice3,
  VocabularyPractice4,
} from "./activity/VocabularyPractice";

const screenHeight = window.innerHeight + "px";

export default function Quiz() {
  return (
    <>
      <ListeningActivity4 />
    </>
  );
}
