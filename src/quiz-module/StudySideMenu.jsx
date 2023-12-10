import ico_delete from "../assets/images/study-side-menu/delete.svg";
import ico_book from "../assets/images/study-side-menu/book.svg";
import ico_repeat from "../assets/images/study-side-menu/repeat.svg";
import ico_quiz from "../assets/images/study-side-menu/check_board.svg";
import ico_movie from "../assets/images/study-side-menu/movie_book.svg";
import ico_speak from "../assets/images/study-side-menu/rec.svg";
import ico_exit from "../assets/images/study-side-menu/exite.svg";
import icoScoreItemCorrect from "../assets/images/ico_score_item_correct.svg";
import icoScoreItemIncorrect from "../assets/images/ico_score_item_incorrect.svg";

// 학습 사이드 메뉴
export default function StudySideMenu({
  isEBook,
  isEBookRead,
  isQuiz,
  viewSideMenu,
  bookCode,
  bookTitle,
  stepTitle,
  onClickRead,
  onClickQuiz,
  onClickExit,
  _scoreBoard,
}) {
  const ChangeItem = (id, className) => {
    return (document.getElementById(id).className = className);
  };

  return (
    <div
      id="study-side-menu"
      className="study-side-menu animate__animated animate__fadeIn"
    >
      <div
        id="study-side-menu-container"
        className="study-side-menu-container animate__animated animate__slideInRight"
      >
        <div className="study-side-menu-area-top">
          <div className="close-side-menu">
            <div
              className="btn-delete"
              onClick={() => {
                ChangeItem(
                  "study-side-menu",
                  "study-side-menu animate__animated animate__fadeOut"
                );
                ChangeItem(
                  "study-side-menu-container",
                  "study-side-menu-container animate__animated animate__slideOutRight"
                );
                setTimeout(() => {
                  viewSideMenu && viewSideMenu(false);
                  _scoreBoard && _scoreBoard(false);
                }, 300);
              }}
            >
              <img src={ico_delete} alt="" />
            </div>
          </div>
          <div className="book-info">
            <div className="book-code">{bookCode}</div>
            <div className="book-title">{bookTitle}</div>
          </div>
          <SelectStudyMenu
            isEBook={isEBook}
            isEbookRead={isEBookRead}
            isQuiz={isQuiz}
          />
          {isEBook && <div className="label">추가 학습</div>}
          {/* 보고있는 화면이 이북인 경우 */}
          {isEBook && <EBookMoreActivity />}
          {/* 보고있는 화면이 퀴즈인 경우 */}
          {isQuiz && <StudySideMenuQuizScoreboard stepTitle={stepTitle} />}
        </div>
        <div className="study-side-menu-area-bottom">
          <div
            className="btn-exit"
            onClick={() => {
              onClickExit;
            }}
          >
            <img src={ico_exit} alt="" />
            <div className="txt">학습종료</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 학습 사이드 메뉴 > 학습 선택
const SelectStudyMenu = ({ isEBook, isEbookRead, isQuiz }) => {
  return (
    <div className="select-study-menu">
      {isEBook && !isEbookRead ? (
        <div className="select-study-menu-item on">
          <img src={ico_book} alt="" />
          책읽기
        </div>
      ) : isEBook && isEbookRead ? (
        <div className="select-study-menu-item completed">
          <img src={ico_repeat} alt="" />
          다시 읽기
          <div class="pyro">
            <div class="before"></div>
            <div class="after"></div>
          </div>
        </div>
      ) : (
        <div className="select-study-menu-item">
          <img src={ico_book} alt="" />
          책읽기
        </div>
      )}
      <div className={`select-study-menu-item ${isQuiz && "on"}`}>
        <img src={ico_quiz} alt="" />
        퀴즈풀기
      </div>
    </div>
  );
};

// 학습 사이드 메뉴 > eBook 추가학습 보기
const EBookMoreActivity = () => {
  return (
    <div className="ebook-more-activity">
      <hr />
      <div className="ebook-more-activity-item">
        <img src={ico_movie} alt="" />
        무비시청
      </div>
      <hr />
      <div className="ebook-more-activity-item">
        <img src={ico_speak} alt="" />
        SPEAK (말하기 연습)
      </div>
      <hr />
    </div>
  );
};

// 학습 사이드 메뉴 > Quiz 스토어보드
const StudySideMenuQuizScoreboard = ({ stepTitle }) => {
  return (
    <div className="study-side-menu-quiz-scoreboard">
      <div className="step-info">
        <div className="step on">Step1</div>
        <div className="step">2</div>
        <div className="step">3</div>
        <div className="step">4</div>
        <div className="step">5</div>
      </div>
      <div className="score-info">
        <div className="quiz-type">{stepTitle}</div>
        <div className="score">
          <div className="score-row header">
            <div className="score-col">Q</div>
            <div className="score-col">1st</div>
            <div className="score-col">2nd</div>
          </div>
          <div className="score-row">
            <div className="score-col">1</div>
            <div className="score-col">
              <img src={icoScoreItemCorrect} alt="" />
            </div>
            <div className="score-col">
              <img src={icoScoreItemIncorrect} alt="" />
            </div>
          </div>
          <div className="score-row">
            <div className="score-col">2</div>
            <div className="score-col">
              <img src={icoScoreItemCorrect} alt="" />
            </div>
            <div className="score-col">
              <img src={icoScoreItemIncorrect} alt="" />
            </div>
          </div>
          <div className="score-row">
            <div className="score-col">3</div>
            <div className="score-col">
              <img src={icoScoreItemCorrect} alt="" />
            </div>
            <div className="score-col">
              <img src={icoScoreItemIncorrect} alt="" />
            </div>
          </div>
          <div className="score-row">
            <div className="score-col">4</div>
            <div className="score-col">
              <img src={icoScoreItemCorrect} alt="" />
            </div>
            <div className="score-col">
              <img src={icoScoreItemIncorrect} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 학습 사이드 메뉴 > Quiz 스코어보드 아이템
