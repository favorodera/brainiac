import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: "google",
      fonts: {
        spacemono:[
          {
            name:"Space Mono",
            weights:["400","700"],
            italic:true
          }
        ]
      }
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
