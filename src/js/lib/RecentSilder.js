import { Template } from './Template.js';
import $ from 'jquery';
import LazyElement from './LazyImage.js';
import Swiper from 'swiper';
import Cursor from './Cursor.js';

export default class RecentSlider {
  constructor() {
  	this.container = '#grid__container';
  	this.carouselContainer = '.recent-carousel';
  	this.slide = 'grid__item';
  	this.arrows = '.arrow__container';
  	this.lazy = new LazyElement();    
    this.cursor = new Cursor();
  	this.init();
  }

  async init() {
  	const slider = await this.ajaxLoad();

  	this.templateBuilder(slider);
  }

  templateBuilder(slider) {
    $(this.container).append(slider.map(template => Template(template))).promise().done(() => {
      this.lazy.init();
      this.sliderWork();
    });
  }

  sliderWork() {
    var self = this;
  	this.btnNext = $(this.arrows).find('.arrow__right');
  	this.btnPrev = $(this.arrows).find('.arrow__left');

  	this.carouselSetting = {
  		nextButton: this.btnNext,
  		prevButton: this.btnPrev,
  		slidesPerView: 2,
  		slideClass: this.slide,
  		breakpoints: {
  			1180: {
  				slidesPerView: 1
  			}
  		},
      onInit: function() {
        $('.link-color').css({
          'color': $(self.carouselContainer).parents('.barba-container').data('textcolor')
        });
        self.cursor.init();
        console.log(true);
      }
    };

    this.swiperCarousel = new Swiper(this.carouselContainer, this.carouselSetting);
  }

  ajaxLoad() {
  	return new Promise(res => {
      $.ajax({
        'async': true,
        'global': false,
        'url': '../../json/recent.json',
        'dataType': 'json',
        'success': function(json) {
          res(json.recent);
        }
      });
    });
  }

}
