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
        "bulletin-cityname": "#d8c422",
        "frost-pane-title": "#d8c422"
      },
      backgroundImage: {
        "slideouter": "radial-gradient(farthest-corner at 963px 569px, #000d28, #001668)",
        "slideheadgrad": "linear-gradient(to right, rgba(147, 156, 171, 0), rgba(147, 156, 171, .97))",
        "bulletin-image": "url(/images/newbg/weather_bulletin_bg.png)",
        "bulletin-frost-pane": "url(/images/newbg/bulletinfrostpane.svg)",
        "severe-city-info-image": "url(/images/newbg/severe_core_bg.png)",
        "frost-pane": "url(/images/newbg/frostpane.svg)",
        "severe-frost-pane": "url(/images/newbg/severefrostpane.svg)"
      },
      backgroundColor: {
        "slidehead": "#2267b7",
        "infoslide-color": "transparent"
      },
      backgroundPosition: {
        "infoslide-pos": "69% 41.5%",
        "bulletin-frost-pane": "-72px -329px",
        "severe-city-info-pos": "69% 41.5%",
        "frost-pane": "-72px -329px"
      },
      backgroundSize: {
        "infoslide-size": "120.3% 150.9%",
        "bulletin-frost-pane": "1065px 1164px",
        "severe-city-info-size": "120.3% 150.9%",
        "frost-pane": "1065px 1164px"
      },
      padding: {
        "slides": "2.5px 0 2.5px 2.5px",
        "slidehead": "0 7.5px",
        "slidehead-severe-city-info-r": "10%",
        "noreport-t": "23.5%",
        "noreport-l": "29.65%",
        "tempunavailable-l": "15%",
        "bulletin-warnings": "10px",
        "severe-frost-pane": "1% 18% 1% 7%"
      },
      boxShadow: {
        "slideouter": "0 3px 10px 0 rgba(0, 0, 0, .35)"
      },
      inset: {
        "slidehead": "2.5px",
        "gradient-r": "125px",
        "subhead-noaa-r": "105px",
        "bulletin-cityname-l": "50px",
        "bulletin-cityname-t": "16px",
        "bulletin-warnings-l": "50px",
        "bulletin-warnings-t": "62.5px",
        "subhead-city-r": "90px",
        "subhead-shadow-t": "50.8%",
        "subhead-shadow-l": "7px",
        "severe-forecast": "10%"
      },
      height: {
        "slidehead": "42.5px",
        "subhead": "60px",
        "severe-frost-pane": "446.25px",
        "severe-frost-pane-content": "400px"
      },
      fontSize: {
        "slidehead": "31px",
        "hscroller": "30px",
        "subhead": "39px",
        "subhead-bulletin": "40.5px",
        "subhead-noaa": "22.5px",
        "bulletin-frost-pane": "36px",
        "bulletin-cityname": "36px",
        "bulletin-warnings": "40px",
        "subhead-city": "31px",
        "noreport": "48px",
        "tempunavailable": "49px",
        "severe-forecast": "110%",
        "frost-pane": "36px",
        "frost-pane-content": "50px",
        "severe-frost-pane-title": "41.5px"
      },
      minWidth: {
        "slidehead": "125%",
        "subhead-shadow": "20%",
        "infoslide": "885px"
      },
      maxWidth: {
        "infoslide": "885px"
      },
      minHeight: {
        "slidehead": "42.5px",
        "infoslide": "99.87%"
      },
      maxHeight: {
        "slidehead": "42.5px",
        "infoslide": "99.87%",
        "bulletin-frost-pane": "446.25px",
        "frost-pane": "446.25px",
        "severe-frost-pane-content": "400px"
      },
      transformOrigin: {
        "left-center": "left center"
      },
      lineHeight: {
        "hscroller": "23.5px",
        "subheader": "24.5px",
        "subhead-noaa": "35px",
        "bulletin-warnings": "125%",
        "frost-pane-content": "125%"
      },
      width: {
        "gradient": "125px",
        "subhead-shadow": "250%"
      },
      zIndex: {
        "default": "1",
        "infoslide": "5",
        "subheader": "4",
        "subheader-shadow": "6",
        "noreport": "2000",
        "frost-pane": "388686"
      },
      dropShadow: {
        "none": "0px 0px 0px #000",
        "default": "#000 2px 2px 4px",
        "subhead": "2px 2px 3px #000",
        "subhead-bulletin": "2px 2px 5px #000",
        "bulletin-frost-pane": "#000 2px 2px 4px"
      },
      margin: {
        "bulletin-frost-pane": "60px"
      },
      letterSpacing: {
        "severe-frost-pane-title": ".5px",
        "severe-frost-pane-content": "1.5px"
      },
      translate: {
        "2.5": "2.5px",
        "60px": "60px",
        "42-5": "42.5%",
        "43-5": "43.5%"
      },
      scale: {
        "101": "1.01",
        "102-5": "1.025",
        "105": "1.05",
        "105-9": "1.059",
        "112-5": "1.125",
        "114-5": "1.145",
        "115": "1.15",
        "117": "1.17",
        "118": "1.18"
      }
    },
  },
  plugins: [],
}
