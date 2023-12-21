import { useEffect, useState } from "react";
import ico_menu from "../assets/images/ebook/ico_menu.svg";
import ico_home from "../assets/images/ebook/ico_home.svg";
import ico_chev_white_left from "../assets/images/ebook/ico_chev_white_left.svg";
import ico_chev_white_right from "../assets/images/ebook/ico_chev_white_right.svg";
import ico_chev_down from "../assets/images/ebook/ico_chev_down.svg";
import ico_full_size from "../assets/images/ebook/ico_full_size.svg";
import ico_setting from "../assets/images/ebook/ico_setting.svg";
import ico_setting2 from "../assets/images/ebook/ico_setting2.svg";
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
import ico_speed_08 from "../assets/images/ebook/ico_speed08.svg";
import ico_speed_10 from "../assets/images/ebook/ico_speed10.svg";
import ico_speed_12 from "../assets/images/ebook/ico_speed12.svg";
import ico_speed_15 from "../assets/images/ebook/ico_speed15.svg";

// eBook 헤더
export const EbookHeader = ({ _viewSideMenu }) => {
  return (
    <div className="ebook-header">
      <div
        className="menu-button"
        onClick={() => {
          _viewSideMenu(true);
        }}
      >
        <img src={ico_menu} width={24} height={24} alt="" />
      </div>
    </div>
  );
};

// eBook 페이지
export const EbookPage = ({
  isMobile,
  pageWidth,
  pageHeight,
  pagesScale,
  pageStyle,
  pageContents,
  pageImage,
}) => {
  return (
    <div
      className="ebook-page"
      style={{
        width: isMobile ? pageWidth : pageWidth * pagesScale,
        height: isMobile ? pageHeight : pageHeight * pagesScale,
      }}
    >
      <div
        style={{
          transform: `scale(${pagesScale})`,
          transformOrigin: "top left",
        }}
      >
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
      </div>
      <img src={pageImage} alt="" />
    </div>
  );
};

// eBook 페이지 양쪽 화살표
export const EbookPageArrows = ({
  pageWidth,
  pagesScale,
  turnPageLeft,
  turnPageRight,
}) => {
  return (
    <div
      className="ebook-page-arrows"
      style={{ width: `${pageWidth * pagesScale * 2 + 140}px` }}
    >
      <div className="left-arrow">
        <button
          onClick={() => {
            turnPageLeft();
          }}
        >
          <img src={ico_chev_white_left} width={60} alt="" />
        </button>
      </div>
      <div className="right-arrow">
        <button
          onClick={() => {
            turnPageRight();
          }}
        >
          <img src={ico_chev_white_right} width={60} alt="" />
        </button>
      </div>
    </div>
  );
};

// eBook 플레이바 > 드롭다운 메뉴 (플레이 모드 설정)
export const EbookPlayBarDropdownMenu = ({ menuName, menuItems }) => {
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

// eBook 플레이바 > 모바일용 플레이 모드 설정창
export const EbookPlayModeMobile = ({
  viewEbookPlayModeMobile,
  _viewEbookPlayModeMobile,
}) => {
  const Label = ({ text }) => {
    return <div className="label">{text}</div>;
  };

  const SelectBox = ({ children }) => {
    return <div className="select-box">{children}</div>;
  };

  const SelectButton = ({ name, active }) => {
    return (
      <div className={active ? "select-button on" : "select-button"}>
        <div className="radio"></div>
        {name}
      </div>
    );
  };

  const PageTurningMode = () => {
    const ChooseButton = ({ name, active }) => {
      return (
        <div className={active ? "choose-button on" : "choose-button"}>
          {name}
        </div>
      );
    };

    return (
      <div className="page-turning-mode">
        <ChooseButton name={"수동으로 넘기기"} active={false} />
        <ChooseButton name={"자동으로 넘기기"} active={true} />
      </div>
    );
  };

  const [windowSlideIn, _windowSlideIn] = useState(true);

  const windowSlideOut = () => {
    _windowSlideIn(false);
    setTimeout(() => {
      _viewEbookPlayModeMobile(false);
    }, 500);
  };

  return (
    <div
      className={
        windowSlideIn
          ? "ebook-play-mode-mobile slide-in-bottom"
          : "ebook-play-mode-mobile slide-out-bottom"
      }
    >
      <div className="container">
        <Label text={"읽기 모드"} />
        <SelectBox>
          <SelectButton name={"Basic"} active />
          <SelectButton name={"No Text"} />
          <SelectButton name={"No Highlight"} />
          <SelectButton name={"No Audio"} />
        </SelectBox>
        <Label text={"읽기 속도"} />
        <SelectBox>
          <SelectButton name={"0.8x"} />
          <SelectButton name={"1.0x"} active />
          <SelectButton name={"1.2x"} />
          <SelectButton name={"1.5x"} />
        </SelectBox>
        <Label text={"책장 넘기기"} />
        <PageTurningMode />
      </div>
      <div
        className="light-box"
        onClick={() => {
          windowSlideOut();
        }}
      ></div>
    </div>
  );
};

// eBook 플레이바
export const EbookPlayBar = ({
  progressWidth,
  turnPageLeft,
  turnPageRight,
  isAudioPlay,
  _isAudioPlay,
  isAudioPause,
  _isAudioPause,
  isFullScreen,
  _isFullScreen,
  _viewVocaList,
  IsMobile,
  _viewSideMenu,
}) => {
  const [viewEbookPlayModeMobile, _viewEbookPlayModeMobile] = useState(false);

  return (
    <>
      {/* 프로그레스바 */}
      <div className="ebook-progress-bar">
        <div className="progress" style={{ width: `${progressWidth}%` }}></div>
      </div>
      {/* 플레이바 */}
      <div className={`ebook-play-bar ${IsMobile() ? "mobile" : null}`}>
        {/* 플레이바 > 왼쪽 */}
        <div className="ebook-play-bar-pc-area-l">
          {IsMobile() ? (
            <>
              <div
                className="read-mode-button"
                onClick={() => {
                  viewEbookPlayModeMobile
                    ? _viewEbookPlayModeMobile(false)
                    : _viewEbookPlayModeMobile(true);
                }}
              >
                <img src={ico_speed_10} width={30} height={30} />
              </div>
              {viewEbookPlayModeMobile && (
                <EbookPlayModeMobile
                  viewEbookPlayModeMobile={viewEbookPlayModeMobile}
                  _viewEbookPlayModeMobile={_viewEbookPlayModeMobile}
                />
              )}
            </>
          ) : (
            <>
              <EbookPlayBarDropdownMenu
                menuName="읽기 모드"
                menuItems={[
                  { name: "Basic", selected: "on" },
                  { name: "No Text", selected: "" },
                  { name: "No Audio", selected: "" },
                  { name: "No Highlight", selected: "" },
                ]}
              />
              <EbookPlayBarDropdownMenu
                menuName="재생 속도"
                menuItems={[
                  { name: "0.8x", selected: "" },
                  { name: "1x", selected: "on" },
                  { name: "1.2x", selected: "" },
                  { name: "1.5x", selected: "" },
                ]}
              />
              <EbookPlayBarDropdownMenu
                menuName="페이지 넘기기"
                menuItems={[
                  { name: "Auto", selected: "on" },
                  { name: "Manually", selected: "" },
                ]}
              />
            </>
          )}
        </div>
        {/* 플레이바 > 가운데 */}
        <div className="ebook-play-bar-pc-area-c">
          <div
            className="backward"
            onClick={() => {
              turnPageLeft();
            }}
          >
            <img src={ico_chev_white_left} width={40} alt="" />
          </div>
          <div
            className="play"
            onClick={() => {
              isAudioPause ? _isAudioPause(false) : _isAudioPause(true);
              isAudioPlay ? _isAudioPlay(false) : _isAudioPlay(true);
            }}
          >
            {isAudioPause && <img src={img_play} width={40} />}
            {isAudioPlay && <img src={img_pause} width={40} />}
          </div>
          <div
            className="forward"
            onClick={() => {
              turnPageRight();
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
              _viewVocaList(true);
            }}
          >
            <img src={ico_word} width={28} height={28} alt="" />
          </div>
          {IsMobile() ? (
            <div
              className="menu-button"
              onClick={() => {
                _viewSideMenu(true);
              }}
            >
              <img src={ico_menu} width={24} height={24} alt="" />
            </div>
          ) : (
            <div
              className="full-screen-button"
              onClick={() => {
                if (!isFullScreen) {
                  document.body.requestFullscreen();
                  _isFullScreen(true);
                } else {
                  document.exitFullscreen();
                  _isFullScreen(false);
                }
              }}
            >
              {isFullScreen ? (
                <img src={ico_full_screen_out} width={20} height={20} alt="" />
              ) : (
                <img src={ico_full_screen} width={20} height={20} alt="" />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// eBook 콘텐츠 PC
export const EbookBodyPC = ({ pageWidth, pagesScale, pageAniFX, children }) => {
  return (
    <div
      className="ebook-body-pc"
      style={{ width: pageWidth * pagesScale * 2 }}
    >
      <div className="ebook-contents">
        <div className={`pages ${pageAniFX}`}>{children}</div>
      </div>
    </div>
  );
};

// eBook 콘텐츠 모바일 세로
export const EbookBodyMobileP = ({
  pageAniFX,
  _touchStart,
  _touchEnd,
  children,
}) => {
  return (
    <div
      className="ebook-body-mobile-p"
      onTouchStart={(e) => {
        let x = e.changedTouches[0].pageX;
        _touchStart(x);
      }}
      onTouchEnd={(e) => {
        let x = e.changedTouches[0].pageX;
        _touchEnd(x);
      }}
    >
      <div className={pageAniFX}>{children}</div>
    </div>
  );
};

// eBook 콘텐츠 모바일 가로
export const EbookBodyMobileL = () => {
  return <>이북 모바일 가로</>;
};

// eBook 단어장 > 단어 리스트
export const EbookVocaList = ({ vocaListItem }) => {
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

// eBook 단어장
export const EbookVocabularyNote = (props) => {
  const SelectorChanger = (id, className) => {
    return (document.getElementById(id).className = className);
  };
  const CloseWindow = () => {
    SelectorChanger(
      "ebook-vocabulary-note",
      "ebook-vocabulary-note animate__animated animate__fadeOut"
    );
    SelectorChanger(
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
              <EbookVocaList
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
