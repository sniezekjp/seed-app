module.exports = function(grunt) {
  grunt.initConfig({
    kg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }, 
    sass: {
      dev: {
        files: {
          'client/css/styles.css': 'client/css/styles.scss'
        }
      }
    },
    watch: {
      styles: {
        files: ['client/css/*.css'],
        options: {
          livereload:1337
        }
      },
      sass: {
        files: ['client/css/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass', 'watch']);
};