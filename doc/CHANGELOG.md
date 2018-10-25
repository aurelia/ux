### [aurelia-ux 0.11.0](https://github.com/aurelia/ux/compare/v0.10.1...v0.11.0)

#### Bug Fixes

* style: update properties that do not have a watcher on theme change
* theming: remove ensureDefaultTheme
* input: conform to new material design standards, add floating label
* input: add border radius to top of input
* input: apply correct css variables
* input: correct background colors and inherit font color
* input: align hover effect with material specifications
* input: increase animation length and add variables
* style: add border radius to outline button

### [aurelia-ux 0.10.0](https://github.com/aurelia/ux/compare/v0.9.1...v0.10.0)

#### Features

* New UX Card Component

#### Bug Fixes

* list: set text-decoration to none on ux-list
* grid: disable max width on sm size
* button: make icon button flat background with inherited color
* textarea: bottom border no longer disappears on hover
* Select: use conventional view strategy (#166)
* ux-input: remove margin from bottom of input
* update themes and default styles to facilitate better theming
* checkbox: fix css from previous conversion for border
* style-controller: assign default theme after ensuring it is created

### [aurelia-ux 0.8.0](https://github.com/aurelia/ux/compare/v0.7.1...v0.8.0)

### Features

* New Component: ux-select
* CSS Fallback properties
* events for two way binding
* better configuration API, add checkbox

#### Bug Fixes

* use Refelect instead Object
* add missing exports from aurelia-binding
* remove old style.inputinfo binding
* change event surpress timing
* various issues fixed for select, radio and checkbox

<a name="0.3.0"></a>
# 0.3.0 (2017-07-26)

* fix(checkbox) disabled checkbox behavior (#80) ([32eb94c](https://github.com/aurelia/ux/commit/32eb94c))
* feat(checkbox): add unchecked value ([88505d9](https://github.com/aurelia/ux/commit/88505d9)), closes [#69](https://github.com/aurelia/ux/issues/69)
* feat(list): add ux-list control (#82) ([ee64238](https://github.com/aurelia/ux/commit/ee64238))
* feat(ux): expose style engine ([f623c70](https://github.com/aurelia/ux/commit/f623c70)), closes [#73](https://github.com/aurelia/ux/issues/73)
* fix(all): bundle all files with aurelia-cli ([c69c1ff](https://github.com/aurelia/ux/commit/c69c1ff)), closes [#17](https://github.com/aurelia/ux/issues/17)
* fix(button): add disable button behavior (#76) ([a16f47f](https://github.com/aurelia/ux/commit/a16f47f))
* fix(icon): remove quotes ([66966e4](https://github.com/aurelia/ux/commit/66966e4))



<a name="0.2.0"></a>
# 0.2.0 (2017-05-30)

* fix(checkbox): fix delete this.checked issue ([007627d](https://github.com/aurelia/ux/commit/007627d))
* fix(icons): prepare for pr and fix logging ([2dd51b5](https://github.com/aurelia/ux/commit/2dd51b5))
* feat(button): icon button type ([cf0fea8](https://github.com/aurelia/ux/commit/cf0fea8)), closes [#25](https://github.com/aurelia/ux/issues/25)
* feat(icon): add material icon set ([4da8ecf](https://github.com/aurelia/ux/commit/4da8ecf))
* feat(icon): add ux-icon component ([09ff549](https://github.com/aurelia/ux/commit/09ff549))



<a name="0.1.19"></a>
## 0.1.19 (2017-04-27)

* refactor(index): wrap exports in PLATFORM.moduleName ([345ccc1](https://github.com/aurelia/ux/commit/345ccc1))
* fix(chip-input): add value changed back ([30c2f75](https://github.com/aurelia/ux/commit/30c2f75))
* fix(chip-input): check for value on left arrow ([cc0bd39](https://github.com/aurelia/ux/commit/cc0bd39)), closes [#64](https://github.com/aurelia/ux/issues/64)
* fix(chipinput): add transparent background ([d2ebeb5](https://github.com/aurelia/ux/commit/d2ebeb5))
* fix(chips): correctly delete single chip in input ([0aeba74](https://github.com/aurelia/ux/commit/0aeba74))
* fix(chips): remove last chip without freezing browser ([78b224c](https://github.com/aurelia/ux/commit/78b224c)), closes [#60](https://github.com/aurelia/ux/issues/60)
* fix(readme): correct test-watch command ([3e5cbd7](https://github.com/aurelia/ux/commit/3e5cbd7)), closes [#58](https://github.com/aurelia/ux/issues/58)
* style(input-info): change error display ([ad5d9ad](https://github.com/aurelia/ux/commit/ad5d9ad))
* feat(checkbox): accessibility ([3504664](https://github.com/aurelia/ux/commit/3504664))
* feat(checkbox): add binding support ([67d73ff](https://github.com/aurelia/ux/commit/67d73ff))
* feat(checkbox): add disabled state ([fbcf50b](https://github.com/aurelia/ux/commit/fbcf50b))
* feat(checkbox): add label attribute binding ([c989f32](https://github.com/aurelia/ux/commit/c989f32))
* feat(checkbox): add ux-checkbox ([a417b46](https://github.com/aurelia/ux/commit/a417b46))
* feat(checkbox): focus state ripple and selection ([6367b16](https://github.com/aurelia/ux/commit/6367b16))
* feat(checkbox): simple checkbox features ([fde48f4](https://github.com/aurelia/ux/commit/fde48f4))
* feat(label): add label attribute binding ([8e06eac](https://github.com/aurelia/ux/commit/8e06eac))



<a name="0.1.18"></a>
## 0.1.18 (2017-04-10)

* refactor(chip): code cleanup ([971c1f2](https://github.com/aurelia/ux/commit/971c1f2))
* refactor(chip): code cleanup ([6767f1b](https://github.com/aurelia/ux/commit/6767f1b))
* refactor(chips): refactor chips ([62e6391](https://github.com/aurelia/ux/commit/62e6391))
* fix(chip-input): null check ([b026e70](https://github.com/aurelia/ux/commit/b026e70))
* fix(chip): more value checking ([b981456](https://github.com/aurelia/ux/commit/b981456))
* feat(chip): add closeable chip and final size ([3b73225](https://github.com/aurelia/ux/commit/3b73225))
* feat(chip): add tag closing and finish styling ([085273d](https://github.com/aurelia/ux/commit/085273d))
* feat(chips): add chip input ([32c5792](https://github.com/aurelia/ux/commit/32c5792))
* feat(tag-input): add implimentation for tag components ([38c945e](https://github.com/aurelia/ux/commit/38c945e))



<a name="0.1.17"></a>
## 0.1.17 (2017-04-06)

* chore(all): lint ([8d3a53a](https://github.com/aurelia/ux/commit/8d3a53a))
* chore(form): prepare for pr ([f4ac0f7](https://github.com/aurelia/ux/commit/f4ac0f7))
* chore(lint): remove uses of Function type ([b02205d](https://github.com/aurelia/ux/commit/b02205d))
* chore(vscode): turn off format on save ([25f7473](https://github.com/aurelia/ux/commit/25f7473))
* feat(form): add ux form and form-row utility ([8ed6f83](https://github.com/aurelia/ux/commit/8ed6f83))
* feat(form): add ux-field component ([d20e78b](https://github.com/aurelia/ux/commit/d20e78b))
* feat(form): submit ([0bc8799](https://github.com/aurelia/ux/commit/0bc8799))
* feat(form): submit-on-enter attribute ([6d44f7e](https://github.com/aurelia/ux/commit/6d44f7e))
* feat(formField): add label by attribute ([7aaae37](https://github.com/aurelia/ux/commit/7aaae37))
* feat(input-info): find & set target automatically ([0143c93](https://github.com/aurelia/ux/commit/0143c93))
* feat(input): add input types ([056ff7c](https://github.com/aurelia/ux/commit/056ff7c))
* style(button): remove left and right margin ([7b4254d](https://github.com/aurelia/ux/commit/7b4254d))
* style(input): change input textarea margins ([88b3d54](https://github.com/aurelia/ux/commit/88b3d54))
* style(input): further refactor style controls ([4ea3248](https://github.com/aurelia/ux/commit/4ea3248))
* Fix #30 (#42) ([c9166dd](https://github.com/aurelia/ux/commit/c9166dd)), closes [#30](https://github.com/aurelia/ux/issues/30) [#42](https://github.com/aurelia/ux/issues/42)



# 0.1.16

### Features

* Add ux-input component
* Add ux-textarea component

### Bug Fixes

* Fix color name
* Fix textarea contains template

# 0.1.15

### Features

* Add shadows to design language.
