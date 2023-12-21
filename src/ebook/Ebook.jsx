import React from "react";
import { useState, useEffect } from "react";
import { ebPageData } from "./sample/sampleEbKa001";
import StudySideMenu from "../quiz-module/StudySideMenu";
import {
  EbookHeader,
  EbookBodyPC,
  EbookPage,
  EbookPlayBar,
  EbookPageArrows,
  EbookVocabularyNote,
  EbookBodyMobileP,
} from "./EbookComponent";
import { useImportPageImage } from "./EBookHook";

// 모바일 기기인지 체크
const IsMobile = () => {
  return /Android|webOS|iPhone| iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// 디바이스가 세로(true)인지 가로(false)인지 체크
const IsPortrate = window.matchMedia("(orientation: portrait)").matches;

// eBook Story 화면
export default function EBook() {
  const windowWidth = screen.width;
  const windowHeight = window.innerHeight;
  const [pageWidth, _pageWidth] = useState();
  const [pageHeight, _pageHeight] = useState();
  const [pagesScale, _pagesScale] = useState();
  const [windowResize, _windowResize] = useState();
  const [eBookRightButton, _eBookRightButton] = useState("");
  const [eBookLeftButton, _eBookLeftButton] = useState("");
  const [pageNumber, _pageNumber] = useState(1);
  const [pageAniFX, _pageAniFX] = useState();
  const [isAudioPlay, _isAudioPlay] = useState(true);
  const [isAudioPause, _isAudioPause] = useState(false);
  const [isFullScreen, _isFullScreen] = useState(false);
  const [viewSideMenu, _viewSideMenu] = useState(false);
  const [viewVocaList, _viewVocaList] = useState(false);
  const [touchStart, _touchStart] = useState();
  const [touchEnd, _touchEnd] = useState();

  // 이미지 소스 가져오기
  const { pageImgSrc } = useImportPageImage(ebPageData);

  // 이미지 사이즈 추출하기
  const eBookPageImg = new Image();
  eBookPageImg.src = pageImgSrc[0];
  eBookPageImg.onload = () => {
    _pageWidth(eBookPageImg.width);
    _pageHeight(eBookPageImg.height);
    _windowResize("");
    IsMobile()
      ? _pagesScale(windowWidth / pageWidth)
      : _pagesScale((windowHeight / pageHeight) * 0.9);
  };

  // 창크기에 따라 실시간으로 사이즈 변경하기
  useEffect(() => {
    window.addEventListener("resize", () => {
      _pageWidth(eBookPageImg.width);
      _pageHeight(eBookPageImg.height);
      _windowResize(1);
    });
    if (pageNumber == 1) {
      _eBookLeftButton("d-none");
    } else {
      _eBookLeftButton("");
    }
    if (pageNumber == pageImgSrc.length - 1) {
      _eBookRightButton("d-none");
    } else {
      _eBookRightButton("");
    }
  }, [windowResize]);

  // eBook 페이지 넘기기
  const turnPageLeft = () => {
    if (pageNumber > 1) {
      _pageAniFX("");
      setTimeout(() => {
        _pageAniFX("slide-in-left");
        IsMobile() ? _pageNumber(pageNumber - 1) : _pageNumber(pageNumber - 2);
      }, 100);
    } else {
      return;
    }
  };
  const turnPageRight = () => {
    const pageLength = IsMobile() ? pageImgSrc.length : pageImgSrc.length - 1;

    if (pageNumber < pageLength) {
      _pageAniFX("");
      setTimeout(() => {
        _pageAniFX("slide-in-right");
        IsMobile() ? _pageNumber(pageNumber + 1) : _pageNumber(pageNumber + 2);
      }, 100);
    } else {
      return;
    }
  };

  // eBook 프로그레스바 길이 구하기
  const progressWidth =
    ((IsMobile() ? pageNumber : pageNumber + 1) / pageImgSrc.length) * 100;

  // 모바일 핑거 스와이프
  useEffect(() => {
    if (touchStart - touchEnd > 5) {
      turnPageRight();
    }
    if (touchStart - touchEnd < 0) {
      turnPageLeft();
    }
  }, [touchEnd]);

  return (
    // 배경 이미지는 해당 eBook의 추천 도서에서 사용되는 배경 이미지가 나와야 함
    <div
      id="ebook"
      style={{
        backgroundImage: `url("https://wcfresource.a1edu.com/newsystem/image/br/bgebook/aa-1.jpg")`,
        height: windowHeight,
      }}
    >
      {IsMobile() ? (
        <>
          <EbookBodyMobileP
            pageAniFX={pageAniFX}
            _touchStart={_touchStart}
            _touchEnd={_touchEnd}
          >
            <EbookPage
              pageWidth={pageWidth}
              pageImage={pageImgSrc[pageNumber - 1]}
              pagesScale={pagesScale}
              pageNumber={pageNumber}
              pageStyle={ebPageData[pageNumber - 1].pageStyle}
              pageContents={ebPageData[pageNumber - 1].pageContents}
            />
          </EbookBodyMobileP>
          <EbookPlayBar
            progressWidth={progressWidth}
            turnPageLeft={turnPageLeft}
            turnPageRight={turnPageRight}
            isAudioPlay={isAudioPlay}
            _isAudioPlay={_isAudioPlay}
            isAudioPause={isAudioPause}
            _isAudioPause={_isAudioPause}
            _viewSideMenu={_viewSideMenu}
            _viewVocaList={_viewVocaList}
            touchStart={touchStart}
            touchEnd={touchEnd}
            _touchStart={_touchStart}
            _touchEnd={_touchEnd}
            IsMobile={IsMobile}
          />
        </>
      ) : (
        <>
          <EbookHeader _viewSideMenu={_viewSideMenu} />
          <EbookBodyPC
            pageWidth={pageWidth}
            pagesScale={pagesScale}
            pageAniFX={pageAniFX}
          >
            <EbookPage
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              pagesScale={pagesScale}
              pageImage={pageImgSrc[pageNumber - 1]}
              pageNumber={pageNumber}
              pageStyle={ebPageData[pageNumber - 1].pageStyle}
              pageContents={ebPageData[pageNumber - 1].pageContents}
            />
            <EbookPage
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              pagesScale={pagesScale}
              pageImage={pageImgSrc[pageNumber]}
              pageNumber={pageNumber}
              pageStyle={ebPageData[pageNumber].pageStyle}
              pageContents={ebPageData[pageNumber].pageContents}
            />
          </EbookBodyPC>
          <EbookPageArrows
            pageWidth={pageWidth}
            pagesScale={pagesScale}
            turnPageLeft={turnPageLeft}
            turnPageRight={turnPageRight}
          />
          <EbookPlayBar
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
            IsMobile={IsMobile}
          />
        </>
      )}
      {viewSideMenu && (
        <StudySideMenu
          isEBook={true}
          isEBookRead={true}
          // isQuiz
          viewSideMenu={_viewSideMenu}
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
