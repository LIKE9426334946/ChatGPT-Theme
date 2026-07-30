/*
 * ChatGPT 会在用户向上查看历史消息时动态创建“滚动到底部”按钮。
 * 不同页面模式使用的标签和属性并不完全一致，因此先匹配语义属性，
 * 再通过位置、尺寸和结构识别没有公开标识的同类按钮。
 */

(() => {
  "use strict";

  const hiddenAttribute =
    "data-chatgpt-theme-hidden-scroll-button";

  const semanticSelector = [
    '[data-testid="scroll-to-bottom-button"]',
    '[data-testid="scroll-down-button"]',
    '[data-testid*="scroll" i][data-testid*="bottom" i]',
    '[data-testid*="scroll" i][data-testid*="down" i]',
    '[aria-label="Scroll to bottom" i]',
    '[aria-label="Scroll down" i]',
    '[aria-label="Go to bottom" i]',
    '[aria-label="滚动到底部"]',
    '[aria-label="滚动至底部"]',
    '[title="Scroll to bottom" i]',
    '[title="Scroll down" i]',
    '[title="滚动到底部"]',
    '[title="滚动至底部"]'
  ].join(",");

  const excludedWords =
    /composer|speech|voice|microphone|send|submit|plus|attach|upload/i;

  const hideElement = (element) => {
    const clickable =
      element.closest("button, [role='button']") || element;

    clickable.setAttribute(hiddenAttribute, "");
  };

  const hasPositionedAncestor = (element, boundary) => {
    let current = element;

    for (let depth = 0; current && depth < 3; depth += 1) {
      const position = getComputedStyle(current).position;

      if (
        position === "absolute" ||
        position === "fixed" ||
        position === "sticky"
      ) {
        return true;
      }

      if (current === boundary) {
        break;
      }

      current = current.parentElement;
    }

    return false;
  };

  const isCenteredArrowButton = (element, boundary) => {
    if (
      element.hasAttribute(hiddenAttribute) ||
      element.closest("form") ||
      !element.querySelector("svg")
    ) {
      return false;
    }

    const identity = [
      element.id,
      element.getAttribute("data-testid"),
      element.getAttribute("aria-label"),
      element.getAttribute("title"),
      element.className
    ].join(" ");

    if (excludedWords.test(identity)) {
      return false;
    }

    if (element.textContent.trim().length > 0) {
      return false;
    }

    const rect = element.getBoundingClientRect();
    const boundaryRect = boundary.getBoundingClientRect();

    if (
      rect.width < 28 ||
      rect.width > 64 ||
      rect.height < 28 ||
      rect.height > 64 ||
      rect.bottom <= 0 ||
      rect.top >= window.innerHeight
    ) {
      return false;
    }

    const centerX = rect.left + rect.width / 2;
    const boundaryCenterX =
      boundaryRect.left + boundaryRect.width / 2;
    const horizontalTolerance = Math.max(
      72,
      boundaryRect.width * 0.06
    );

    if (
      Math.abs(centerX - boundaryCenterX) >
      horizontalTolerance
    ) {
      return false;
    }

    const centerY = rect.top + rect.height / 2;

    if (
      centerY < window.innerHeight * 0.45 ||
      centerY > window.innerHeight - 40
    ) {
      return false;
    }

    const borderRadius =
      Number.parseFloat(getComputedStyle(element).borderRadius) || 0;

    return (
      borderRadius >= Math.min(rect.width, rect.height) * 0.35 &&
      hasPositionedAncestor(element, boundary)
    );
  };

  const hideScrollButtons = () => {
    document
      .querySelectorAll(semanticSelector)
      .forEach(hideElement);

    const boundary =
      document.querySelector("main, [role='main']") ||
      document.querySelector("#thread-bottom-container");

    if (!boundary) {
      return;
    }

    document
      .querySelectorAll("button, [role='button']")
      .forEach((element) => {
        if (isCenteredArrowButton(element, boundary)) {
          hideElement(element);
        }
      });
  };

  let framePending = false;

  const scheduleCheck = () => {
    if (framePending) {
      return;
    }

    framePending = true;

    requestAnimationFrame(() => {
      framePending = false;
      hideScrollButtons();
    });
  };

  const observer = new MutationObserver(scheduleCheck);

  observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [
      "class",
      "style",
      "hidden",
      "aria-hidden",
      "data-state"
    ]
  });

  document.addEventListener("scroll", scheduleCheck, true);
  window.addEventListener("resize", scheduleCheck);

  scheduleCheck();
})();
