name = STSext

scripts = *.js
manifest = manifest.json
content = *.html
locales = _locales/*/*.json
package = $(name).zip

zip = 7z
zip_opt = -stl

package: $(package)

$(package): $(manifest) $(scripts) $(content) $(locales)
	$(zip) a $(zip_opt) $(package) $?
