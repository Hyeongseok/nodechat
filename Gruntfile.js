module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        git_head: process.env.GIT_HEAD,
        nodeunit: {
            all: ['tests/*.js']
        },
        preprocess: {
            dist: {
                files: {
                    'views/chat.ejs': 'views/chat.pre'
                ,   'views/layout.ejs': 'views/layout.pre'
                ,   'src/js/chat.js': 'src/js/chat.pre.js'
                }
            }
        },
        clean: {
            dist: {
                src: ['static/js/*.js']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dist: {
                src: ['src/js/*.js', '!src/js/md5.js']
            }
        },
        concat: {
            app: {
                src: [
                    'src/js/md5.js' 
                ,   'src/js/components.js' 
                ,   'src/js/models.js' 
                ,   'src/js/chat.js'
                ],
                dest: 'static/js/ChatPage.js'
            },
            frameworks: {
                src: [
                    'bower_components/jquery/dist/jquery.js'
                ,   'bower_components/underscore/underscore.js'
                ,   'bower_components/backbone/backbone.js'
                ,   'bower_components/react/react.js'
                ,   'bower_components/postal.js/lib/postal.js'
                ,   'bower_components/momentjs/moment.js'
                ],
                dest: 'static/js/Frameworks.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'static/js/ChatPage.<%= git_head %>.min.js': '<%= concat.app.dest %>'
                ,   'static/js/Frameworks.<%= git_head %>.min.js': '<%= concat.frameworks.dest %>'
                }
            }
        },
        watch: {
            files: ['src/js/*.js']
        ,   tasks: ['default']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['nodeunit', 'preprocess', 'clean', 'jshint', 'concat:app', 'concat:frameworks', 'uglify']);
    grunt.registerTask('prep', ['nodeunit', 'preprocess']);
};