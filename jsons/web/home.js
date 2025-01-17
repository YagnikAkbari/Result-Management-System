const navlayout = [
  {
    className: "",
    styles: {
      display: "flex",
      justifyContent: "space-between",
      padding: "0 23px",
    },
    id: "navbar",
    child: [
      {
        className: "",
        fieldType: "image",
        alt: "product",
        src: "/images/logo.svg",
        height: "44px",
        width: "171.45px",
      },
      {
        className: "flex items-center",
        styles: {
          display: "flex",
          justifyContent: "flex-start",
          gap: "23px",
        },
        child: [
          {
            fieldType: "ul",
            className: "flex",
            styles: {
              display: "flex",
              gap: "23px",
            },
            listItem: [
              {
                label: "Home",
              },
              {
                label: "Medicines",
              },
              {
                label: "Lab tests",
              },
              {
                label: "Store Locator",
              },
              {
                label: "Compare Medicines",
              },
            ],
          },
          {
            fieldType: "button",
            label: "Free Consultation",
            className: "",
            fontWeight: "500",
            color: "#FFFFFF",
            buttonClassName: "flex items-center justify-center",
            styles: {
              backgroundImage: "linear-gradient(to right, #10396C, #56B199)",
              padding: "10px 23.5px",
              lineHeight: "24px",
              fontWeight: "500",
              borderRadius: "8px",
              padding: "9px 12px",
              margin: "8px 0",
              border: "none",
            },
            borderRadius: "8px",
            padding: "9px 12px",
            margin: "8px 0",
            actions: [
              {
                actionType: "callApi",
                apis: [
                  {
                    endpoint: "/addToCart",
                    method: "get",
                    id: "",
                    staticPayload: {
                      quantity: "1",
                    },
                    dynamicPayload: [
                      {
                        id: "",
                        fieldName: "",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        className: "flex items-center",
        styles: {
          display: "flex",
          justifyContent: "flex-start",
          gap: "23px",
        },
        child: [
          {
            className:
              "bg-slate-300 p-1 border-1 border-slate-600 rounded-full",
            fieldType: "image",
            alt: "User",
            src: "/images/lang.svg",
            height: "20px",
            width: "20px",
            styles: {
              backgroundColor: "#f2f4f7",
              border: "1px solid #d0d5dd",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            },
          },
          {
            className:
              "bg-slate-300 p-1 border-1 border-slate-600 rounded-full",
            fieldType: "image",
            alt: "User",
            src: "/images/cart.svg",
            height: "20px",
            width: "20px",
            styles: {
              backgroundColor: "#f2f4f7",
              border: "1px solid #d0d5dd",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            },
          },
          {
            className:
              "bg-slate-300 p-1 border-1 border-slate-600 rounded-full",
            fieldType: "image",
            alt: "User",
            src: "/images/user.svg",
            height: "20px",
            width: "20px",
            styles: {
              backgroundColor: "#f2f4f7",
              border: "1px solid #d0d5dd",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            },
          },
        ],
      },
    ],
  },
  {
    className: "",
    id: "",
    styles: {
      maxWidth: "750px",
      backgroundColor: "red",
    },
    child: [
      {
        fieldType: "breadcrumbs",
      },
    ],
  },
];

const webfooterLayout = [
  {
    child: [
      {
        className: "footer-container",
        styles: {
          display: "flex",
          flexDirection: "column",
          padding: "48px 0px",
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid #EAECF0",
        },
        child: [
          {
            className: "footer-links-section",
            styles: {
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            },
            child: [
              {
                className: "footer-column",
                styles: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                },
                child: [
                  {
                    fieldType: "h3",
                    label: "About Medkart Pharmacy",
                    styles: {
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#101828",
                      marginBottom: "16px",
                    },
                  },
                  {
                    fieldType: "ul",
                    styles: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    },
                    listItem: [
                      { label: "About Us" },
                      { label: "Contact Us" },
                      { label: "Franchise" },
                      { label: "Blog" },
                      { label: "Download App" },
                    ],
                  },
                ],
              },
              {
                className: "footer-column",
                styles: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                },
                child: [
                  {
                    fieldType: "h3",
                    label: "Our Services",
                    styles: {
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#101828",
                      marginBottom: "16px",
                    },
                  },
                  {
                    fieldType: "ul",
                    styles: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    },
                    listItem: [
                      { label: "Order Medicines" },
                      { label: "Lab tests" },
                      { label: "Generic Medicines" },
                      { label: "Compare Medicines" },
                      { label: "Drug Comparison Tool" },
                      { label: "Locate Nearest Store" },
                      { label: "Stores Page" },
                    ],
                  },
                ],
              },
              {
                className: "footer-column",
                styles: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                },
                child: [
                  {
                    fieldType: "h3",
                    label: "Browse by",
                    styles: {
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#101828",
                      marginBottom: "16px",
                    },
                  },
                  {
                    fieldType: "ul",
                    styles: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    },
                    listItem: [
                      { label: "Browse All Medicines" },
                      { label: "Browse All Molecules" },
                    ],
                  },
                ],
              },
              {
                className: "footer-column",
                styles: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                },
                child: [
                  {
                    fieldType: "h3",
                    label: "Policies",
                    styles: {
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#101828",
                      marginBottom: "16px",
                    },
                  },
                  {
                    fieldType: "ul",
                    styles: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    },
                    listItem: [
                      { label: "Privacy Policy" },
                      { label: "Terms of services" },
                      { label: "Return & Refund Policy" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            className: "footer-social-section",
            styles: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "32px",
              borderTop: "1px solid #EAECF0",
            },
            child: [
              {
                className: "social-links",
                styles: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                },
                child: [
                  {
                    fieldType: "h4",
                    label: "Follow Us On",
                    styles: {
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "16px",
                    },
                  },
                  {
                    className: "social-icons",
                    styles: {
                      display: "flex",
                      gap: "16px",
                    },
                    child: [
                      {
                        fieldType: "image",
                        src: "/images/linkedin.svg",
                        alt: "LinkedIn",
                        width: "24px",
                        height: "24px",
                      },
                      {
                        fieldType: "image",
                        src: "/images/facebook.svg",
                        alt: "Facebook",
                        width: "24px",
                        height: "24px",
                      },
                      {
                        fieldType: "image",
                        src: "/images/instagram.svg",
                        alt: "Instagram",
                        width: "24px",
                        height: "24px",
                      },
                      {
                        fieldType: "image",
                        src: "/images/youtube.svg",
                        alt: "YouTube",
                        width: "24px",
                        height: "24px",
                      },
                    ],
                  },
                ],
              },
              {
                className: "app-download",
                styles: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                },
                child: [
                  {
                    fieldType: "h4",
                    label: "Download the app for free",
                    styles: {
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "16px",
                    },
                  },
                  {
                    className: "app-store-buttons",
                    styles: {
                      display: "flex",
                      gap: "16px",
                    },
                    child: [
                      {
                        fieldType: "image",
                        src: "/images/playstore.svg",
                        alt: "Get it on Google Play",
                        width: "135px",
                        height: "40px",
                      },
                      {
                        fieldType: "image",
                        src: "/images/appstore.svg",
                        alt: "Download from App Store",
                        width: "135px",
                        height: "40px",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            className: "footer-copyright",
            styles: {
              textAlign: "center",
              padding: "24px 0",
              color: "#667085",
              fontSize: "14px",
            },
            child: [
              {
                fieldType: "p",
                label: "©2024 Medkart Pharmacy. All Rights Reserved",
              },
            ],
          },
        ],
      },
    ],
  },
];

const aboutMedkart = [
  {
    className: "flex items-center",
    styles: {
      display: "flex",
      justifyContent: "center",
      gap: "100px",
    },
    child: [
      {
        className: "",
        child: [
          {
            fieldType: "label",
            labelType: "span",
            label: "About Medkart Phrmacy",
            className: "",
          },
          {
            fieldType: "ul",
            className: "flex flex-col",
            styles: {
              display: "flex",
              flexDirection: "column",
              gap: "23px",
            },
            listItem: [
              {
                label: "Home",
              },
              {
                label: "Medicines",
              },
              {
                label: "Lab tests",
              },
              {
                label: "Store Locator",
              },
              {
                label: "Compare Medicines",
              },
            ],
          },
        ],
      },
      {
        className: "",
        child: [
          {
            fieldType: "label",
            labelType: "span",
            label: "About Medkart Phrmacy",
            className: "",
          },
          {
            fieldType: "ul",
            className: "flex flex-col",
            styles: {
              display: "flex",
              flexDirection: "column",
              gap: "23px",
            },
            listItem: [
              {
                label: "Home",
              },
              {
                label: "Medicines",
              },
              {
                label: "Lab tests",
              },
              {
                label: "Store Locator",
              },
              {
                label: "Compare Medicines",
              },
            ],
          },
        ],
      },
      {
        className: "",
        child: [
          {
            fieldType: "label",
            labelType: "span",
            label: "About Medkart Phrmacy",
            className: "",
          },
          {
            fieldType: "ul",
            className: "flex flex-col",
            styles: {
              display: "flex",
              flexDirection: "column",
              gap: "23px",
            },
            listItem: [
              {
                label: "Home",
              },
              {
                label: "Medicines",
              },
              {
                label: "Lab tests",
              },
              {
                label: "Store Locator",
              },
              {
                label: "Compare Medicines",
              },
            ],
          },
        ],
      },
      {
        className: "",
        child: [
          {
            fieldType: "label",
            labelType: "span",
            label: "About Medkart Phrmacy",
            className: "",
          },
          {
            fieldType: "ul",
            className: "flex flex-col",
            styles: {
              display: "flex",
              flexDirection: "column",
              gap: "23px",
            },
            listItem: [
              {
                label: "Home",
              },
              {
                label: "Medicines",
              },
              {
                label: "Lab tests",
              },
              {
                label: "Store Locator",
              },
              {
                label: "Compare Medicines",
              },
            ],
          },
        ],
      },
    ],
  },
];

const errorjson = [
  {
    className: "flex flex-col",
    styles: {
      display: "flex",
      justifyContent: "center",
    },
    child: [
      {
        className: "",
        fieldType: "image",
        alt: "Dettol",
        src: "/images/404.svg",
      },
    ],
  },
];

module.exports = [
  { type: "layout", data: navlayout },
  { type: "children" },
  { type: "layout", data: webfooterLayout },
];

//   {
//     className: "",
//     child: [
//       {
//         className: "ratings-reviews-container flex flex-col p-4 gap-4",
//         child: [
//         //   {
//         //     fieldType: "label",
//         //     labelType: "h2",
//         //     label: "Ratings & Review",
//         //     className: "text-lg font-medium mb-4",
//         //   },
//         //   {
//         //     className: "reviews-list flex flex-col gap-4",
//         //     child: [
//         //       {
//         //         // First Review
//         //         className: "review-card flex flex-col gap-2 pb-4 border-b",
//         //         child: [
//         //           {
//         //             fieldType: "rating",
//         //             value: 3,
//         //             maxValue: 5,
//         //             className: "flex",
//         //             showRatingText: true,
//         //             ratingText: "(3/5)",
//         //           },
//         //           {
//         //             fieldType: "label",
//         //             labelType: "h3",
//         //             label: "Review Title",
//         //             className: "font-medium",
//         //           },
//         //           {
//         //             fieldType: "label",
//         //             labelType: "p",
//         //             label: "Nice product for kids during season change",
//         //             className: "text-gray-600",
//         //           },
//         //           {
//         //             className:
//         //               "review-meta flex gap-2 text-sm text-gray-500",
//         //             child: [
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "Vijay Sethi",
//         //                 className: "",
//         //               },
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "•",
//         //                 className: "",
//         //               },
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "Reviewed on 15 Apr 2024",
//         //                 className: "",
//         //               },
//         //             ],
//         //           },
//         //         ],
//         //       },
//         //       {
//         //         // Second Review
//         //         className: "review-card flex flex-col gap-2 pb-4 border-b",
//         //         child: [
//         //           {
//         //             fieldType: "rating",
//         //             value: 3,
//         //             maxValue: 5,
//         //             className: "flex",
//         //             showRatingText: true,
//         //             ratingText: "(3/5)",
//         //           },
//         //           {
//         //             fieldType: "label",
//         //             labelType: "h3",
//         //             label: "Review Title",
//         //             className: "font-medium",
//         //           },
//         //           {
//         //             fieldType: "label",
//         //             labelType: "p",
//         //             label: "Nice product for kids during season change",
//         //             className: "text-gray-600",
//         //           },
//         //           {
//         //             className:
//         //               "review-meta flex gap-2 text-sm text-gray-500",
//         //             child: [
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "Vijay Sethi",
//         //                 className: "",
//         //               },
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "•",
//         //                 className: "",
//         //               },
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "Reviewed on 15 Apr 2024",
//         //                 className: "",
//         //               },
//         //             ],
//         //           },
//         //         ],
//         //       },
//         //       {
//         //         // Third Review
//         //         className: "review-card flex flex-col gap-2 pb-4 border-b",
//         //         child: [
//         //           {
//         //             fieldType: "rating",
//         //             value: 3,
//         //             maxValue: 5,
//         //             className: "flex",
//         //             showRatingText: true,
//         //             ratingText: "(3/5)",
//         //           },
//         //           {
//         //             fieldType: "label",
//         //             labelType: "h3",
//         //             label: "Review Title",
//         //             className: "font-medium",
//         //           },
//         //           {
//         //             fieldType: "label",
//         //             labelType: "p",
//         //             label: "Nice product for kids during season change",
//         //             className: "text-gray-600",
//         //           },
//         //           {
//         //             className:
//         //               "review-meta flex gap-2 text-sm text-gray-500",
//         //             child: [
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "Vijay Sethi",
//         //                 className: "",
//         //               },
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "•",
//         //                 className: "",
//         //               },
//         //               {
//         //                 fieldType: "label",
//         //                 labelType: "span",
//         //                 label: "Reviewed on 15 Apr 2024",
//         //                 className: "",
//         //               },
//         //             ],
//         //           },
//         //         ],
//         //       },
//         //       {
//         //         // "View More" Button
//         //         className: "view-more-container pt-2",
//         //         child: [
//         //           {
//         //             fieldType: "button",
//         //             label: "View More Reviews",
//         //             className: "text-blue-600 font-medium",
//         //             variant: "link",
//         //           },
//         //         ],
//         //       },
//         //     ],
//         //   },
//         ],
//       },
//     ],
//   },
