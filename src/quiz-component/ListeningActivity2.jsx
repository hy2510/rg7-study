import { useState, useEffect, useContext } from "react";
import { QuizContext } from "../App";

import QuizHeader from "../quiz-module/QuizHeader";
import QuizBody from "../quiz-module/QuizBody";
import { QuizContentsTop, QuizContents } from "../quiz-module/QuizBody";
import BtnPlay from "../quiz-module/BtnPlay";
import SignCorrect from "../quiz-module/SignCorrect";
import SignIncorrect from "../quiz-module/SignIncorrect";
import ModalTestResult from "../quiz-module/ModalTestResult";

export default function ListeningActivity2() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 테마 에셋 (애니메이션)
  const themeAsset = {
    forest: {
      basic: "../html/rabbit/00_rabbit_default.html",
      basicDark: "../html/turtle/00_tuttle.html",
      correct: "../html/rabbit/01_bluerabbit.html",
      correctDark: "../html/turtle/01_bluetuttle.html",
      incorrect: "../html/rabbit/00_rabbit_wrong.html",
      incorrectDark: "../html/turtle/00_tuttle_wrong.html",
    },
    kidsRoom: {
      basic: "../html/puppy/00_default.html",
      basicDark: "../html/cat/00_sleep.html",
      correct: "../html/puppy/01_bluepuppy.html",
      correctDark: "../html/cat/01_bluecat.html",
      incorrect: "../html/puppy/00_default_wrong.html",
      incorrectDark: "../html/cat/00_angry_wrong.html",
    },
    space: {
      basic: "../html/rocket/00_rocket.html",
      basicDark: "../html/astronaut/00_astronant_default.html",
      correct: "../html/rocket/01_bluerocket.html",
      correctDark: "../html/astronaut/01_blue_atronant.html",
      incorrect: "../html/rocket/00_rocket_wrong.html",
      incorrectDark: "../html/astronaut/00_astronant_wrong.html",
    },
    farm: {
      basic: "../html/chick/00_default_chicken.html",
      basicDark: "../html/owl/00_default_owl.html",
      correct: "../html/chick/01_blue_chicken.html",
      correctDark: "../html/owl/01_blue_owl.html",
      incorrect: "../html/chick/00_chicken wrong.html",
      incorrectDark: "../html/owl/00_owl_wrong.html",
    },
  };

  const themeAssetUrl = themeAsset.kidsRoom.basic;
  const themeAssetCorrectUrl = themeAsset.kidsRoom.correct;
  const themeAssetIncorrectUrl = themeAsset.kidsRoom.incorrect;
  const themeAssetUrlDark = themeAsset.kidsRoom.basicDark;
  const themeAssetUrlCorrectDark = themeAsset.kidsRoom.correctDark;
  const themeAssetUrlIncorrectDark = themeAsset.kidsRoom.incorrectDark;

  return (
    <>
      <div id="listening-activity-2">
        <QuizBody step={1} quizType={"Listening Activity"}>
          <QuizContentsTop>
            <div className="question">
              <BtnPlay />
            </div>
          </QuizContentsTop>
          <QuizContents>
            <div className="answer-list">
              <div className="answer-item">
                {isDarkMode ? (
                  <iframe
                    src={themeAssetUrlCorrectDark}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                ) : (
                  <iframe
                    src={themeAssetCorrectUrl}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                )}
                <div className="word">ax</div>
              </div>
              <div className="answer-item">
                {isDarkMode ? (
                  <iframe
                    src={themeAssetUrlIncorrectDark}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                ) : (
                  <iframe
                    src={themeAssetIncorrectUrl}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                )}
                <div className="word">apple</div>
              </div>
              <div className="answer-item correct ">
                {isDarkMode ? (
                  <iframe
                    src={themeAssetUrlDark}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                ) : (
                  <iframe
                    src={themeAssetUrl}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                )}
                <div className="word">nest</div>
              </div>
              <div className="answer-item correct ">
                {isDarkMode ? (
                  <iframe
                    src={themeAssetUrlDark}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                ) : (
                  <iframe
                    src={themeAssetUrl}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                )}
                <div className="word">best</div>
              </div>
              <div className="answer-item correct ">
                {isDarkMode ? (
                  <iframe
                    src={themeAssetUrlDark}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                ) : (
                  <iframe
                    src={themeAssetUrl}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                )}
                <div className="word">ox</div>
              </div>
              <div className="answer-item">
                {isDarkMode ? (
                  <iframe
                    src={themeAssetUrlDark}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                ) : (
                  <iframe
                    src={themeAssetUrl}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none", overflow: "hidden" }}
                  />
                )}
                <div className="word">alligator</div>
              </div>
            </div>
          </QuizContents>
        </QuizBody>
      </div>
      <SignCorrect />
      <SignIncorrect />
      <div id="screen-block"></div>
    </>
  );
}
