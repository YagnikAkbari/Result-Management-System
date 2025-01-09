const navlayout = [
  {
    className: "flex justify-between items-center",
    styles: {
      width: "100vw",
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
        height: "44",
        width: "171.45",
      },
      {
        className: "flex items-center",
        styles: {
          justifyContent: "flex-start",
          gap: "23px",
        },
        child: [
          {
            fieldType: "ul",
            className: "flex",
            styles: {
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
];

const webfooterLayout = [
  {
    className: "flex items-center",
    id: "footer",
    styles: {
      justifyContent: "space-between",
    },
    child: [
      {
        className: "flex flex-col",

        child: [
          {
            className: "",
            fieldType: "image",
            alt: "Dettol",
            src: "/images/dettol.svg",
          },
          {
            fieldType: "label",
            labelType: "span",
            label: "Dellot",
            className: "",
          },
        ],
      },
      {
        className: "flex flex-col",
        styles: {
          justifyContent: "center",
        },
        child: [
          {
            className: "",
            fieldType: "image",
            alt: "Dettol",
            src: "/images/dettol.svg",
          },
          {
            fieldType: "label",
            labelType: "span",
            label: "Dellot",
            className: "",
          },
        ],
      },
      {
        className: "flex flex-col",
        styles: {
          justifyContent: "center",
        },
        child: [
          {
            className: "",
            fieldType: "image",
            alt: "Dettol",
            src: "/images/dettol.svg",
          },
          {
            fieldType: "label",
            labelType: "span",
            label: "Dellot",
            className: "",
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
      gap: "100px",
      justifyContent: "center",
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
  { type: "layout", data: aboutMedkart },
];
