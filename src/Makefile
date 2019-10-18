name = STSext

scripts = *.js
manifest = manifest.json
content = *.html
package = $(name).zip

zip = 7z
zip_opt = -stl

package: $(package)

$(package): $(manifest) $(scripts) $(content)
	$(zip) a $(zip_opt) $(package) $?
