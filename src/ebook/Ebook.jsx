import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ico_home from "../assets/images/ebook/ico_home.svg";
import ico_chev_white_left from "../assets/images/ebook/ico_chev_white_left.svg";
import ico_chev_white_right from "../assets/images/ebook/ico_chev_white_right.svg";
import ico_chev_down from "../assets/images/ebook/ico_chev_down.svg";
import ico_full_size from "../assets/images/ebook/ico_full_size.svg";
import ico_setting from "../assets/images/ebook/ico_setting.svg";
import img_movie from "../assets/images/ebook/img_movie.svg";
import img_play from "../assets/images/ebook/img_play.svg";
import img_pause from "../assets/images/ebook/img_pause.svg";
import img_rec from "../assets/images/ebook/img_rec.svg";
import img_story from "../assets/images/ebook/img_story.svg";
import img_study from "../assets/images/ebook/img_study.svg";
import img_word from "../assets/images/ebook/img_word.svg";
import ico_word from "../assets/images/ebook/ico_word.svg";
import ico_menu from "../assets/images/ebook/ico_menu.svg";
import { ebPageData } from "./sample/sampleEbKa001";

export default function EBook() {
  // eBook 페이지 이미지 불러오기
  const getPageImage = ebPageData.map((a, i) => {
    return a.pageImage;
  });
  const pageImage = [...getPageImage];
  function preloading(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      let pageImg = new Image();
      pageImg.src = arr[i];
    }
  }
  preloading(pageImage);

  // eBook 사이즈 계산하기
  const windowHeight = window.innerHeight;
  const eBookPageImg = new Image();
  eBookPageImg.src = pageImage[0];
  eBookPageImg.onload = () => {
    _pageWidth(eBookPageImg.width);
    _pageHeight(eBookPageImg.height);
    _resize("");
    _pagesScale((windowHeight / pageHeight) * 0.9);
  };
  const [pageWidth, _pageWidth] = useState();
  const [pageHeight, _pageHeight] = useState();
  const [resize, _resize] = useState();
  const [pagesScale, _pagesScale] = useState();
  const [eBookRightButton, _eBookRightButton] = useState("");
  const [eBookLeftButton, _eBookLeftButton] = useState("");
  useEffect(() => {
    window.addEventListener("resize", () => {
      _pageWidth(eBookPageImg.width);
      _pageHeight(eBookPageImg.height);
      _resize(1);
    });
    if (pageNumber == 1) {
      _eBookLeftButton("d-none");
    } else {
      _eBookLeftButton("");
    }
    if (pageNumber == pageImage.length - 1) {
      _eBookRightButton("d-none");
    } else {
      _eBookRightButton("");
    }
  });

  // eBook 페이지 넘기기 기능
  const [pageNumber, _pageNumber] = useState(1);
  const [pageAniFX, _pageAniFX] = useState();
  const turnPageRight = () => {
    if (pageNumber < pageImage.length - 1) {
      _pageAniFX("");
      setTimeout(() => {
        _pageAniFX("slide-in-right");
        _pageNumber(pageNumber + 2);
      }, 200);
    } else {
      return;
    }
  };
  const turnPageLeft = () => {
    if (pageNumber > 1) {
      _pageAniFX("");
      setTimeout(() => {
        _pageAniFX("slide-in-left");
        _pageNumber(pageNumber - 2);
      }, 200);
    } else {
      return;
    }
  };

  // 모바일 기기 감지
  function IsMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  useEffect(() => {
    if (IsMobile()) {
      console.log("모바일이네");
    } else {
      console.log("모바일이 아니네");
    }
    if (window.matchMedia("(orientation: portrait)").matches) {
      console.log("세로네");
    } else {
      console.log("가로네");
    }
  });

  // 디폴트 화면
  return (
    // 배경 이미지는 해당 eBook의 추천 도서에서 사용되는 배경 이미지가 나와야 함
    <div
      id="ebook"
      style={{
        backgroundImage: `url("https://wcfresource.a1edu.com/newsystem/image/br/bgebook/yard-2.jpg")`,
      }}
    >
      <div className="ebook-header">
        <div className="ebook-header-s1">
          <div className="home-button">
            <img src={ico_home} width={20} alt="" />
          </div>
          <div className="book-title">Alligator's Apples (1st)</div>
        </div>
        <div className="ebook-header-s2">
          <div className="menu-button">
            <img src={ico_menu} width={24} alt="" />
          </div>
        </div>
      </div>
      <div className="ebook-body" style={{ width: pageWidth * pagesScale * 2 }}>
        <EBookContentsPc
          pageImage={pageImage}
          pageWidth={pageWidth}
          pageHeight={pageHeight}
          pagesScale={pagesScale}
          turnPageRight={turnPageRight}
          pageNumber={pageNumber}
          pageAniFX={pageAniFX}
          turnPageLeft={turnPageLeft}
        />
      </div>
      {/* <StepScoreBoard /> */}
    </div>
  );
}

// eBook 페이지
const EbPage = ({ pageStyle, pageContents }) => {
  return (
    <div className="text-wrapper">
      <div dangerouslySetInnerHTML={pageStyle}></div>
      <div
        style={{
          transform: "scale(1.66)",
          transformOrigin: "top left",
          position: "absolute",
        }}
        dangerouslySetInnerHTML={pageContents}
      ></div>
    </div>
  );
};

// eBook Story 화면 PC 버전
function EBookContentsPc(props) {
  const pageImage = props.pageImage;
  const pageWidth = props.pageWidth * props.pagesScale;
  const pageHeight = props.pageHeight * props.pagesScale;
  const pagesScale = props.pagesScale;
  const turnPageRight = props.turnPageRight;
  const turnPageLeft = props.turnPageLeft;
  const pageNumber = props.pageNumber;
  const pageAniFX = props.pageAniFX;
  const [playStatus, _playStatus] = useState("pause");
  const progressWidthPC = ((pageNumber + 1) / pageImage.length) * 100;

  return (
    <div className="ebook-contents">
      <div className={`pages ${pageAniFX}`}>
        <div
          className="page"
          style={{
            width: pageWidth,
            height: pageHeight,
          }}
        >
          <div
            style={{
              transform: `scale(${pagesScale})`,
              transformOrigin: "top left",
            }}
          >
            {/* 좌측 페이지 */}
            <EbPage
              pageStyle={ebPageData[pageNumber - 1].pageStyle}
              pageContents={ebPageData[pageNumber - 1].pageContents}
            />
          </div>
          <img src={pageImage[pageNumber - 1]} alt="" />
        </div>
        <div
          className="page"
          style={{
            width: pageWidth,
            height: pageHeight,
          }}
        >
          <div
            style={{
              transform: `scale(${pagesScale})`,
              transformOrigin: "top left",
            }}
          >
            {/* 우측 페이지 */}
            <EbPage
              pageStyle={ebPageData[pageNumber].pageStyle}
              pageContents={ebPageData[pageNumber].pageContents}
            />
          </div>
          <img src={pageImage[pageNumber]} alt="" />
        </div>
      </div>
      <div className="page-progress-bar">
        <div
          className="progress"
          style={{ width: `${progressWidthPC}%` }}
        ></div>
      </div>
      {/* 플레이 바 */}
      <div className="ebook-controls">
        <div className="read-mode">
          <div className="read-mode-option">
            <span>Basic</span>
            <img src={ico_chev_down} width={15} alt="" />
          </div>
          <div className="read-mode-option">
            <span>1x</span>
            <img src={ico_chev_down} width={15} alt="" />
          </div>
        </div>
        <div className="audio-control">
          <div
            className="backward"
            onClick={() => {
              turnPageLeft();
            }}
          >
            <img src={ico_chev_white_left} width={25 * pagesScale * 2} alt="" />
          </div>
          <div
            className="play"
            onClick={() => {
              _playStatus(playStatus == "play" ? "pause" : "play");
            }}
            style={{
              width: `30 * &{pagesScale} * 2`,
              height: `30 * &{pagesScale} * 2`,
            }}
          >
            {playStatus == "pause" && (
              <img src={img_play} width={30 * pagesScale * 2} />
            )}
            {playStatus == "play" && (
              <img src={img_pause} width={30 * pagesScale * 2} />
            )}
          </div>
          <div
            className="forward"
            onClick={() => {
              turnPageRight();
            }}
          >
            <img
              src={ico_chev_white_right}
              width={25 * pagesScale * 2}
              alt=""
            />
          </div>
        </div>
        <div className="full-screen">
          <div className="word-button">
            <img src={ico_word} width={30} height={30} alt="" />
          </div>
          <div className="full-screen-button">
            <img src={ico_full_size} width={18} height={18} alt="" />
          </div>
        </div>
      </div>
      {/* <div className="ebook-page-arrows">
        <div className="left-button">
          <button
            onClick={() => {
              turnPageLeft();
            }}
          >
            <img src={ico_chev_white_left} width={60} alt="" />
          </button>
        </div>
        <div className="right-button">
          <button
            onClick={() => {
              turnPageRight();
            }}
          >
            <img src={ico_chev_white_right} width={60} alt="" />
          </button>
        </div>
      </div> */}
    </div>
  );
}

// eBook Story 화면 모바일 버전
function EBookContentsMobile() {
  return <></>;
}

// 좌측 메뉴 펼침
function StepScoreBoard(props) {
  return (
    <div
      id="step-score-board"
      className="step-score-board animate__animated animate__fadeIn"
    >
      <div id="board" className="board animate__animated animate__slideInRight">
        <div className="sec1">
          <div className="delete-bar">
            <div
              className="btn-delete"
              // onClick={() => {
              //   ChangeItem(
              //     "board",
              //     "board animate__animated animate__slideOutRight"
              //   );
              //   ChangeItem(
              //     "step-score-board",
              //     "step-score-board animate__animated animate__fadeOut"
              //   );
              //   setTimeout(() => {
              //     props._scoreBoard(false);
              //   }, 300);
              // }}
            >
              {/* <img src={icoDeleteWhite} alt="" /> */}
            </div>
          </div>
          <div className="book-info">
            <div className="book-code">EB-KA-001</div>
            <div className="book-title">Aligators Apples</div>
          </div>
          <div className="step-info">
            <div className="step on">Step1</div>
            <div className="step">2</div>
            <div className="step">3</div>
            <div className="step">4</div>
            <div className="step">5</div>
          </div>
          <div className="score-info">
            <div className="quiz-type">Listening Activity</div>
            {/* <div className="score">
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
            </div> */}
          </div>
        </div>
        {/* <div className="sec2">
          <div className="btn-go-to-story">
            <img src={icoScoreItemBook} alt="" />
            <div className="txt">Story</div>
          </div>
          <div className="btn-book-info">
            <img src={icoScoreItemInfo} alt="" />
            <div className="txt">Book Info</div>
          </div>
          <div className="btn-exit">
            <img src={icoScoreItemExit} alt="" />
            <div className="txt">Exit</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
