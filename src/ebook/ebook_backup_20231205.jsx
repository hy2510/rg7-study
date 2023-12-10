import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react"; <- 모바일에서 페이지 스와이프 기능 넣을 때 사용
// import "swiper/css"; <- 모바일에서 페이지 스와이프 기능 넣을 때 사용
import ico_home from "../assets/images/ebook/ico_home.svg";
import ico_chev_white_left from "../assets/images/ebook/ico_chev_white_left.svg";
import ico_chev_white_right from "../assets/images/ebook/ico_chev_white_right.svg";
import ico_chev_down from "../assets/images/ebook/ico_chev_down.svg";
import ico_full_size from "../assets/images/ebook/ico_full_size.svg";
import ico_setting from "../assets/images/ebook/ico_setting.svg";
import ico_delete_white from "../assets/images/ico_delete_white.svg";
import ico_delete_black from "../assets/images/ico_delete_black.svg";
import ico_printer from "../assets/images/ebook/ico_printer.svg";
import ico_speaker from "../assets/images/ebook/ico_speaker.svg";
import ico_full_screen from "../assets/images/ebook/ico_full_screen.svg";
import ico_full_screen_out from "../assets/images/ebook/ico_full_screen_out.svg";
import img_movie from "../assets/images/ebook/img_movie.svg";
import img_play from "../assets/images/ebook/btn_play.svg";
import img_pause from "../assets/images/ebook/btn_pause.svg";
import img_rec from "../assets/images/ebook/img_rec.svg";
import img_story from "../assets/images/ebook/img_story.svg";
import img_study from "../assets/images/ebook/img_study.svg";
import img_word from "../assets/images/ebook/img_word.svg";
import ico_word from "../assets/images/ebook/ico_word.svg";
import ico_menu from "../assets/images/ebook/ico_menu.svg";
import { ebPageData } from "./sample/sampleEbKa001";
import StudySideMenu from "../quiz-module/StudySideMenu";
import EbookContentsMobile from "./ebook-module/EbookContentsMobile";
import EbookHeader from "./ebook-module/EbookHeader";

// eBook Story 내용 > 각 페이지
const EBookPage = (props) => {
  return (
    <div
      className="ebook-page"
      style={{
        width: props.pageWidth * props.pagesScale,
        height: props.pageHeight * props.pagesScale,
      }}
    >
      <div
        style={{
          transform: `scale(${props.pagesScale})`,
          transformOrigin: "top left",
        }}
      >
        <div className="text-wrapper">
          <div dangerouslySetInnerHTML={props.pageStyle}></div>
          <div
            style={{
              transform: "scale(1.66)",
              transformOrigin: "top left",
              position: "absolute",
            }}
            dangerouslySetInnerHTML={props.pageContents}
          ></div>
        </div>
      </div>
      <img src={props.pageImage} alt="" />
    </div>
  );
};

// eBook Story 내용 > 헤더
// const EBookHeader = (props) => {
//   return (
//     <div className="ebook-header">
//       <div
//         className="menu-button"
//         onClick={() => {
//           props._viewEBookSideMenu(true);
//         }}
//       >
//         <img src={ico_menu} width={24} height={24} alt="" />
//       </div>
//     </div>
//   );
// };

// eBook Story 내용 > 본문 (PC버전)
const EBookBodyPc = (props) => {
  return (
    <div
      className="ebook-body-pc"
      style={{ width: props.pageWidth * props.pagesScale * 2 }}
    >
      <div className="ebook-contents">
        <div className={`pages ${props.pageAniFX}`}>{props.children}</div>
      </div>
    </div>
  );
};

// eBook Story 내용 > 플레이바 (PC버전)
const EBookPlayBarPC = (props) => {
  return (
    <>
      {/* 프로그레스바 */}
      <div className="ebook-progress-bar-pc">
        <div
          className="progress"
          style={{ width: `${props.progressWidth}%` }}
        ></div>
      </div>
      {/* 플레이바 */}
      <div className="ebook-play-bar-pc">
        {/* 플레이바 > 왼쪽 */}
        <div className="ebook-play-bar-pc-area-l">
          <EBookPlayBarDropdownMenu
            menuName="읽기 모드"
            menuItems={[
              { name: "Basic", selected: "on" },
              { name: "No Text", selected: "" },
              { name: "No Audio", selected: "" },
              { name: "No Highlight", selected: "" },
            ]}
          />
          <EBookPlayBarDropdownMenu
            menuName="재생 속도"
            menuItems={[
              { name: "0.8x", selected: "" },
              { name: "1x", selected: "on" },
              { name: "1.2x", selected: "" },
              { name: "1.5x", selected: "" },
            ]}
          />
          <EBookPlayBarDropdownMenu
            menuName="페이지 넘기기"
            menuItems={[
              { name: "Auto", selected: "on" },
              { name: "Manually", selected: "" },
            ]}
          />
        </div>
        {/* 플레이바 > 가운데 */}
        <div className="ebook-play-bar-pc-area-c">
          <div
            className="backward"
            onClick={() => {
              props.turnPageLeft();
            }}
          >
            <img src={ico_chev_white_left} width={40} alt="" />
          </div>
          <div
            className="play"
            onClick={() => {
              props.isAudioPause
                ? props._isAudioPause(false)
                : props._isAudioPause(true);
              props.isAudioPlay
                ? props._isAudioPlay(false)
                : props._isAudioPlay(true);
            }}
          >
            {props.isAudioPause && <img src={img_play} width={40} />}
            {props.isAudioPlay && <img src={img_pause} width={40} />}
          </div>
          <div
            className="forward"
            onClick={() => {
              props.turnPageRight();
            }}
          >
            <img src={ico_chev_white_right} width={40} alt="" />
          </div>
        </div>
        {/* 플레이바 > 오른쪽 */}
        <div className="ebook-play-bar-pc-area-r">
          <div
            className="word-button"
            onClick={() => {
              props._viewVocaList(true);
            }}
          >
            <img src={ico_word} width={30} height={30} alt="" />
          </div>
          <div
            className="full-screen-button"
            onClick={() => {
              if (!props.isFullScreen) {
                document.body.requestFullscreen();
                props._isFullScreen(true);
              } else {
                document.exitFullscreen();
                props._isFullScreen(false);
              }
            }}
          >
            {props.isFullScreen ? (
              <img src={ico_full_screen_out} width={20} height={20} alt="" />
            ) : (
              <img src={ico_full_screen} width={20} height={20} alt="" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// eBook Story 내용 > 플레이바 > 드롭다운 메뉴
const EBookPlayBarDropdownMenu = ({ menuName, menuItems }) => {
  // 기능: 메뉴 팝업 띄우기 및 버튼 선택시 이벤트
  const [viewMenu, _viewMenu] = useState(false);
  const [readMode, _readMode] = useState(menuItems);
  let readModeSet = [...readMode];
  const selectedMode = readModeSet.find((a) => {
    return a.selected === "on";
  });

  return (
    <div className="ebook-play-bar-drop-down-menu">
      <div
        className="read-mode-option"
        onClick={() => {
          viewMenu ? _viewMenu(false) : _viewMenu(true);
        }}
      >
        <span>{selectedMode.name}</span>
        <img src={ico_chev_down} width={15} alt="" />
      </div>
      {viewMenu && (
        <>
          <div className="read-mode-option-menu">
            <div className="menu-name">{menuName}</div>
            {readMode.map((a, i) => {
              return (
                <div
                  className={`menu-item ${a.selected}`}
                  onClick={() => {
                    readModeSet.map((b) => {
                      b.selected = "";
                    });
                    readModeSet[i].selected = "on";
                    _readMode(readModeSet);
                    _viewMenu(false);
                  }}
                >
                  {a.name}
                </div>
              );
            })}
          </div>
          <div
            className="light-box"
            onClick={() => {
              _viewMenu(false);
            }}
          ></div>
        </>
      )}
    </div>
  );
};

// eBook Story 내용 > 페이지 양쪽 화살표 (PC버전)
const EBookPageArrowsPC = (props) => {
  return (
    <div
      className="ebook-page-arrows"
      style={{ width: `${props.pageWidth * props.pagesScale * 2 + 140}px` }}
    >
      <div className="left-arrow">
        <button
          onClick={() => {
            props.turnPageLeft();
          }}
        >
          <img src={ico_chev_white_left} width={60} alt="" />
        </button>
      </div>
      <div className="right-arrow">
        <button
          onClick={() => {
            props.turnPageRight();
          }}
        >
          <img src={ico_chev_white_right} width={60} alt="" />
        </button>
      </div>
    </div>
  );
};

// eBook Story 내용 > 본문 (모바일버전)

// eBook Story 내용 > 단어장
const EbookVocabularyNote = (props) => {
  const ChangeItem = (id, className) => {
    return (document.getElementById(id).className = className);
  };
  const CloseWindow = () => {
    ChangeItem(
      "ebook-vocabulary-note",
      "ebook-vocabulary-note animate__animated animate__fadeOut"
    );
    ChangeItem(
      "ebook-vocabulary-note-container",
      "ebook-vocabulary-note-container animate__animated animate__slideOutRight"
    );
    setTimeout(() => {
      props._viewVocaList(false);
    }, 300);
  };

  return (
    <>
      <div
        id="ebook-vocabulary-note"
        className="ebook-vocabulary-note animate__animated animate__fadeIn"
      >
        <div
          id="ebook-vocabulary-note-container"
          className="ebook-vocabulary-note-container animate__animated animate__slideInRight"
        >
          <div className="ebook-vocabulary-note-area-top">
            <div className="close-vocabulary-note">
              <div className="btn-print">
                <img src={ico_printer} alt="" />
              </div>
              <div
                className="btn-delete"
                onClick={() => {
                  CloseWindow();
                }}
              >
                <img src={ico_delete_black} alt="" />
              </div>
            </div>
            <div className="book-info">
              <div className="book-code">EB-KA-001</div>
              <div className="book-title">Aligators Apples</div>
            </div>
            <div className="line"></div>
            <div className="voca-list">
              <EBookVocaList
                vocaListItem={[
                  { word: "apple", mean: "사과", audioSrc: "" },
                  { word: "ant", mean: "개미", audioSrc: "" },
                  { word: "alligator", mean: "악어", audioSrc: "" },
                  { word: "ax", mean: "도끼", audioSrc: "" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      {props.viewVocaList && (
        <div
          className="ebook-vocabulary-note-screen-block"
          onClick={() => {
            CloseWindow();
          }}
        ></div>
      )}
    </>
  );
};

// eBook Story 내용 > 단어장 > 단어 리스트
const EBookVocaList = ({ vocaListItem }) => {
  return (
    <div className="ebook-voca-list">
      {vocaListItem.map((a, i) => {
        return (
          <div className="voca-item">
            <div className="word-item">
              <div className="word">{a.word}</div>
              <img src={ico_speaker} alt="" />
            </div>
            <div className="mean">{a.mean}</div>
          </div>
        );
      })}
    </div>
  );
};

// eBook Story 화면
export default function EBook() {
  // 기능: eBook 페이지 이미지 가져오기
  const getPageImage = ebPageData.map((a, i) => {
    return a.pageImage;
  });
  const pageImage = [...getPageImage];
  const preloading = (arr) => {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      let pageImg = new Image();
      pageImg.src = arr[i];
    }
  };
  preloading(pageImage);

  // 기능: eBook 사이즈 계산하기
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

  // 기능: eBook 페이지 넘기기
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

  // 기능: eBook 오디오 플래이 상태 체크
  const [isAudioPlay, _isAudioPlay] = useState(true);
  const [isAudioPause, _isAudioPause] = useState(false);

  // 기능: eBook 프로그래스바 상태 체크 (PC버전)
  const progressWidth = ((pageNumber + 1) / pageImage.length) * 100;

  // 기능: Full Screen 상태 체크
  const [isFullScreen, _isFullScreen] = useState(false);

  // 기능: 사이드 메뉴 상태 체크
  const [viewEBookSideMenu, _viewEBookSideMenu] = useState(false);

  // 기능: 단어장 상태 체크
  const [viewVocaList, _viewVocaList] = useState(false);

  // 기능: 모바일 기기인지 체크
  function IsMobile() {
    return /Android|webOS|iPhone| iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
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

  // 출력: eBook Story 내용
  return (
    // 배경 이미지는 해당 eBook의 추천 도서에서 사용되는 배경 이미지가 나와야 함
    <div
      id="ebook"
      style={{
        backgroundImage: `url("https://wcfresource.a1edu.com/newsystem/image/br/bgebook/aa-1.jpg")`,
      }}
    >
      <EbookHeader _viewEBookSideMenu={_viewEBookSideMenu} />
      {/* PC 버전 일 때 */}
      <EBookBodyPc
        pageWidth={pageWidth}
        pagesScale={pagesScale}
        pageAniFX={pageAniFX}
      >
        <EBookPage
          pageWidth={pageWidth}
          pageHeight={pageHeight}
          pagesScale={pagesScale}
          pageImage={pageImage[pageNumber - 1]}
          pageNumber={pageNumber}
          pageStyle={ebPageData[pageNumber - 1].pageStyle}
          pageContents={ebPageData[pageNumber - 1].pageContents}
        />
        <EBookPage
          pageWidth={pageWidth}
          pageHeight={pageHeight}
          pagesScale={pagesScale}
          pageImage={pageImage[pageNumber]}
          pageNumber={pageNumber}
          pageStyle={ebPageData[pageNumber].pageStyle}
          pageContents={ebPageData[pageNumber].pageContents}
        />
      </EBookBodyPc>
      <EBookPageArrowsPC
        pageWidth={pageWidth}
        pagesScale={pagesScale}
        turnPageLeft={turnPageLeft}
        turnPageRight={turnPageRight}
      />
      <EBookPlayBarPC
        progressWidth={progressWidth}
        turnPageLeft={turnPageLeft}
        turnPageRight={turnPageRight}
        isAudioPlay={isAudioPlay}
        _isAudioPlay={_isAudioPlay}
        isAudioPause={isAudioPause}
        _isAudioPause={_isAudioPause}
        isFullScreen={isFullScreen}
        _isFullScreen={_isFullScreen}
        _viewVocaList={_viewVocaList}
      />
      {/* {viewEBookSideMenu && (
        <EBookSideMenu _viewEBookSideMenu={_viewEBookSideMenu} />
      )} */}
      <EbookContentsMobile />
      {viewEBookSideMenu && (
        <StudySideMenu
          isEBook={true}
          isEBookRead={true}
          // isQuiz
          viewSideMenu={_viewEBookSideMenu}
          bookCode="EB-KA-001"
          bookTitle="Alligators Apples"
          stepTitle="Listening Activity"
        />
      )}
      {viewVocaList && (
        <EbookVocabularyNote
          viewVocaList={viewVocaList}
          _viewVocaList={_viewVocaList}
        />
      )}
    </div>
  );
}
