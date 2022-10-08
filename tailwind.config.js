/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      "frutiger": ["Frutiger", "ZemestroSTD", "sans-serif"],
      "interstate": ["Interstate", "ZemestroSTD", "sans-serif"],
      "frutiger57-cond": ["'Frutiger 57 Condensed'", "ZemestroSTD", "sans-serif"],
      "frutigerbold-cn": ["'Frutiger Bold Cn'", "ZemestroSTD", "sans-serif"]
    },
    extend: {
      colors: {
        "subhead-noaa": "#f6a67a",
        "bulletin-cityname": "#d8c422"
      },
      backgroundImage: {
        "slideouter": "radial-gradient(farthest-corner at 963px 569px, #000d28, #001668)",
        "slideheadgrad": "linear-gradient(to right, rgba(147, 156, 171, 0), rgba(147, 156, 171, .97))",
        "bulletin-image": "url(/images/newbg/weather_bulletin_bg.png)",
        "bulletin-frost-pane": "url(/images/newbg/bulletinfrostpane.svg)"
      },
      backgroundColor: {
        "slidehead": "#2267b7",
        "bulletin-color": "transparent"
      },
      backgroundPosition: {
        "bulletin-pos": "69% 41.5%",
        "bulletin-frost-pane": "-72px -329px"
      },
      backgroundSize: {
        "bulletin-size": "120.3% 150.9%",
        "bulletin-frost-pane": "1065px 1164px"
      },
      padding: {
        "slides": "2.5px 0 2.5px 2.5px",
        "slidehead": "0 7.5px",
        "bulletin-warnings": "10px"
      },
      boxShadow: {
        "slideouter": "0 3px 10px 0 rgba(0, 0, 0, .35)"
      },
      inset: {
        "slidehead": "2.5px",
        "subhead-noaa-r": "105px",
        "bulletin-cityname-l": "50px",
        "bulletin-cityname-t": "16px",
        "bulletin-warnings-l": "50px",
        "bulletin-warnings-t": "62.5px"
      },
      height: {
        "slidehead": "42.5px",
        "subhead-bulletin": "60px"
      },
      fontSize: {
        "slidehead": "31px",
        "hscroller": "30px",
        "subhead-bulletin": "40.5px",
        "subhead-noaa": "22.5px",
        "bulletin-frost-pane": "36px",
        "bulletin-cityname": "36px",
        "bulletin-warnings": "40px"
      },
      minWidth: {
        "slidehead": "125%",
        "infoslide": "885px"
      },
      maxWidth: {
        "infoslide": "885px"
      },
      minHeight: {
        "infoslide": "521px"
      },
      maxHeight: {
        "infoslide": "521px",
        "bulletin-frost-pane": "446.25px"
      },
      transformOrigin: {
        "left-center": "left center"
      },
      lineHeight: {
        "hscroller": "23.5px",
        "subheader": "24.5px",
        "subhead-noaa": "35px",
        "bulletin-warnings": "125%"
      },
      width: {
        "gradient": "125px"
      },
      zIndex: {
        "infoslide": "5",
        "subheader": "4",
        "default": "1"
      },
      dropShadow: {
        "none": "0px 0px 0px #000",
        "subhead-bulletin": "2px 2px 5px #000",
        "bulletin-frost-pane": "#000 2px 2px 4px"
      },
      margin: {
        "bulletin-frost-pane": "60px"
      }
    },
  },
  plugins: [],
}
