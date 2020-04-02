import * as c from "../..";

test("inlining-filterable-fragments", async () => {
  await c.API({
    cwd: __dirname,
    contentDir: "content",
    filters: {
      platform: ["android", "ios", "js"],
      framework: ["angular", "ionic", "react", "react-native", "vue"],
    },
    outDir: "api",
    publicDir: "www",
  });

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/aa")).body).toEqual([
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "ios"}},
        [
          "docs-in-page-link",
          {targetId: "im-an-ios-specific-fragment-platform-ios"},
          [
            "h2",
            {id: "im-an-ios-specific-fragment-platform-ios"},
            "I’m an iOS-specific fragment",
          ],
        ],
        "\n",
      ],
    ],
    "\n",
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "android"}},
        [
          "docs-in-page-link",
          {targetId: "im-an-android-specific-fragment-platform-android"},
          [
            "h2",
            {id: "im-an-android-specific-fragment-platform-android"},
            "I’m an Android-specific fragment",
          ],
        ],
        "\n",
      ],
    ],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/aa")).versions).toEqual({
    android: "/product/a/aa?platform=android",
    ios: "/product/a/aa?platform=ios",
    js: "/product?platform=js",
  });

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/ab")).body).toEqual([
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "ios"}},
        [
          "docs-in-page-link",
          {targetId: "im-an-ios-specific-fragment-platform-ios"},
          [
            "h2",
            {id: "im-an-ios-specific-fragment-platform-ios"},
            "I’m an iOS-specific fragment",
          ],
        ],
        "\n",
      ],
    ],
    "\n",
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "android"}},
        [
          "docs-in-page-link",
          {targetId: "im-an-android-specific-fragment-platform-android"},
          [
            "h2",
            {id: "im-an-android-specific-fragment-platform-android"},
            "I’m an Android-specific fragment",
          ],
        ],
        "\n",
      ],
    ],
    "\n",
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "js"}},
        [
          "docs-in-page-link",
          {targetId: "im-a-js-specific-fragment-platform-js"},
          [
            "h2",
            {id: "im-a-js-specific-fragment-platform-js"},
            "I’m a JS-specific fragment",
          ],
        ],
        "\n",
      ],
    ],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/ab")).versions).toEqual({
    android: "/product/a/ab?platform=android",
    ios: "/product/a/ab?platform=ios",
    js: "/product/a/ab?platform=js",
  });
});
