# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
# #   Character.create(name: 'Luke', movie: movies.first)

# # e1 = Event.create(title: 'test', description: 'test', date: 'test', eventbriteId: 'test', location: 'test', dancing_type: 'test', cost: 'test', img: 'test', organizer: 'test')


require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'pry'
require 'open_uri_redirections'

# BEFORE RUNNING ANYTHING MAKE SURE THERE IS NOT BINDING.PRY, MAKE SURE THAT YOU SET THE RANGE OF PAGES YOU WANT TO SACN TO GET THE NUMBER OF PAGES, MALE SURE THERE IS NOT TESTING BREAK.
# RUN THIS FILE WITH RAILS DB:SEED


def get_urls(url, attrValue)
    arr = (31..40).to_a
    # arr = [1]
    urlArray = []

    for n in arr do 
        html_data = open(url+n.to_s).read
        object = Nokogiri::HTML(html_data)
        target = object.css('.'+attrValue)
        target.each { |n| urlArray << n.attribute('href').value }
    end

    filterUrls = []
    
    uniqueUrlArray = urlArray.uniq

    prevuilsyVistedUrls = []


    Visited.all.each { |id| prevuilsyVistedUrls << id.url }

   for id in prevuilsyVistedUrls 
        uniqueUrlArray.select { |url| if url.include? "#{id}" 
            uniqueUrlArray.delete(url)
        end}
   end

    scrapPages(uniqueUrlArray)

end

def scrapPages(array)

    titleArray = []
    descriptionArray = []
    dateArray = []
    locationArray = []
    dancing_typeArray = []
    priceArray = []
    imgArray = []
    eventId = []
    organizerArray = []
    prevuilyVisted = []


    for url in array 

        prevuilyVisted << url.split("-")[-1].split("?")[0]

        if url.include? "/ic"
            next
        end


        html_data = open(url, :allow_redirections => :safe).read
        object = Nokogiri::HTML(html_data)
        
        targetDate = object.css('.listing-hero-image--month').text

        tragetImage = object.css('picture').map { |t| t[:content] }[0]

        if tragetImage == nil
            next
        end

        if targetDate == ""
            next
        end


        if targetDate != 'Multiple DatesMultiple Dates' 

            # find the starting img

            imgArray << tragetImage

            # find the starting title
            title = object.css('.listing-hero-title').text
            titleArray << title

            # find the starting description
            description = object.css('.has-user-generated-content').text.delete("\n\t")
            descriptionArray << description

            
            # find the starting date
            date = object.css('.event-details__data').text.delete("\n\t").split[0..3].join(" ").delete(",")
            dateArray << date


            # find the starting time
            #  Remove the time from Event model

            # find the starting location
            locationStartString = object.css('.listing-map-card-street-address').text.delete("\n\t")
            locationArray << locationStartString


            # find the starting type

            dancing_type = []

            if title.downcase.include? "salsa"
                dancing_type << "salsa"

            elsif title.downcase.include? "bachata"
                dancing_type << "bachata"

            elsif title.downcase.include? "merengue"
                dancing_type << "merengue"

            elsif title.downcase.include? "tango"
                dancing_type << "tango"

            elsif title.downcase.include? "ballroom"
                dancing_type << "ballroom"

            elsif title.downcase.include? "cumbia"
                dancing_type << "cumbia"
                
            elsif title.class == String 
                dancing_type << "general"
            end

            dancing_typeArray << dancing_type[0]

            # find the starting price 
            price = object.css('.js-display-price').text
            newPrice = price.delete("\n\t")
            splitIt = newPrice.split
            priceArray << splitIt[0]

            # find eventId 

            eventId << url.split("-")[-1].split("?")[0]
            
            # find organizer
            organizer = object.css('.js-d-scroll-to').text.split[1..-4].join(" ")

            organizerArray << organizer

            # break for number of events
            # if eventId.size == 5
            #     break
            # end

        end
        
    end

    createVisted(prevuilyVisted)

    createEvents(titleArray, descriptionArray, dateArray, eventId, locationArray, dancing_typeArray, priceArray, imgArray, organizerArray)

end 

def createVisted(urlArray)

    sizeOfArray = urlArray.size - 1
    numbers = (0..sizeOfArray).to_a

    for n in numbers
        Visited.create(url: urlArray[n])
    end

end 

def createEvents(title, description, date, eventbriteId, location, dancing_type, cost, img, organizer)
    
    sizeOfArray = title.size - 1
    numbers = (0..sizeOfArray).to_a

    for n in numbers
        Event.create(title: title[n], description: description[n], date: date[n], eventbriteId: eventbriteId[n], location: location[n], dancing_type: dancing_type[n], cost: cost[n], img: img[n], organizer: organizer[n])
    end

    p 'seed are done'

    clean_price_db()

end


get_urls("https://www.eventbrite.com/d/united-states/social-dance/?page=", "eds-media-card-content__action-link")



def clean_price_db 
    Event.where(:cost => '$0').update_all(:cost => 'Free')
end


