module.exports = function(grunt) {
grunt.loadNpmTasks('grunt-real-favicon');

  grunt.initConfig({

	realFavicon: {
		favicons: {
			src: './img/QVirt_icon.svg',
			dest: '.',
			options: {
				iconsPath: '/',
				html: [ 'index.html' ],
				design: {
					ios: {
						pictureAspect: 'backgroundAndMargin',
						backgroundColor: '#ffffff',
						margin: '14%',
						assets: {
							ios6AndPriorIcons: false,
							ios7AndLaterIcons: false,
							precomposedIcons: false,
							declareOnlyDefaultIcon: true
						}
					},
					desktopBrowser: {},
					windows: {
						pictureAspect: 'noChange',
						backgroundColor: '#00aba9',
						onConflict: 'override',
						assets: {
							windows80Ie10Tile: false,
							windows10Ie11EdgeTiles: {
								small: false,
								medium: true,
								big: false,
								rectangle: false
							}
						}
					},
					androidChrome: {
						pictureAspect: 'noChange',
						themeColor: '#ffffff',
						manifest: {
							name: 'qvirt',
							display: 'standalone',
							orientation: 'notSet',
							onConflict: 'override',
							declared: true
						},
						assets: {
							legacyIcon: false,
							lowResolutionIcons: false
						}
					},
					safariPinnedTab: {
						pictureAspect: 'silhouette',
						themeColor: '#5bbad5'
					}
				},
				settings: {
					scalingAlgorithm: 'Mitchell',
					errorOnImageTooSmall: false
				}
			}
		}
  }
,
    pkg: grunt.file.readJSON('package.json'),

    // Clean-up Task configuration.
    clean: {
      dist: [ 'css/style.*.*' ]
    },

    // HTML Validation Task Configuration
    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: false,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Empty heading.',
          'Bad value'
        ]
      },
      files: {
        src: [ '*.html' ]
      }
    },

    // JS Validation Task Configuration
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },

    // JS Minification
    // https://github.com/gruntjs/grunt-contrib-uglify
    // uglify: {
    //   options: {
    //     mangle: false,
    //     report: 'min'
    //   },
    //   js: {
    //     files: {
    //       'js/totop.min.js': ['js/totop.js']
    //     }
    //   }
    // },

    // LESS Configuration
    less: {
      compileCore: {
        options: {
          strictMath: true
          //sourceMap: true,
          //outputSourceFiles: true,
          //sourceMapURL: 'css/style.css.map',
          //sourceMapFilename: 'css/style.css.map'
        },
        files: {
          'css/style.css': 'less/style.less'
        }
      },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'css/style.min.css': 'css/style.css'
        }
      }
    },

    // CSS Lint Configuration
    // https://github.com/gruntjs/grunt-contrib-csslint
    // https://github.com/stubbornella/csslint/wiki/Rules
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['css/style.css']
    },

    // Connect Static Server Configuration
    // https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    //Watch and LiveReload configuration
    watch: {
      // js: {
      //   files: ['js/toTop.js'],
      //   //tasks: ['concat:js', 'uglify:js'],
      //   tasks: ['uglify'],
      //   options: {
      //     livereload: true,
      //   }
      // },
      css: {
        files: ['less/*.less', 'less/bootstrap/*.less'],
        tasks: ['less'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: ['*.html'],
        tasks: ['validation'],
        options: {
          livereload: true,
        }
      }
    }

  });


 /*
  *  This section is where we require the necessary plugins.
  *
  *  Let's be elegant and just tell Grunt
  *  to read our package.json devDependencies:
  */
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});


 /*
  *  This section is where we setup the Grunt tasks
  */

  // HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // Compile LESS
  grunt.registerTask('compile-less', ['less']);

  // Process Javascript
  grunt.registerTask('process-js', ['jshint']);

  // Lint CSS
  grunt.registerTask('validate-css', ['csslint']);

  // Default Task (drives LiveReload)
  grunt.registerTask('default', [ 'clean', 'less', 'validation', 'connect', 'watch' ]);

};
