# require 'rubygems'
# require 'nokogiri'
# require 'open-uri'
# require 'pry'


# def getUrls(url, attrValue)
#     # arr = (1..2).to_a
#     arr = [1]
#     urlArray = []

#     for n in arr do 
#         html_data = open(url+n.to_s).read
#         object = Nokogiri::HTML(html_data)
#         target = object.css('.'+attrValue)
#         target.each { |n| urlArray << n.attribute('href').value }
#     end
    
#     uniqueUrlArray = urlArray.uniq

#     scrapPages(uniqueUrlArray)

#     # binding.pry

# end

# def scrapPages(array)

#     titleArray = []
#     descriptionArray = []
#     dateArray = []
#     locationArray = []
#     dancing_typeArray = []
#     priceArray = []
#     imgArray = []
#     eventId = []
#     organizerArray = []


#     for url in array 
        
#         if url == 'https://www.eventbrite.com/e/ichmyhg?aff=ebdssbdestsearch'
#             next
#         end

#         html_data = open(url).read
#         object = Nokogiri::HTML(html_data)
        
#         targetDate = object.css('.listing-hero-image--month').text


#         tragetImage = object.css('picture').map { |t| t[:content] }[0]

#         if tragetImage == nil
#             next
#         end

#         if targetDate == ""
#             next
#         end


#         if targetDate != 'Multiple DatesMultiple Dates' 

#             # find the starting img

#             imgArray << tragetImage

#             # find the starting title
#             title = object.css('.listing-hero-title').text
#             titleArray << title

#             # find the starting description
#             description = object.css('.has-user-generated-content').text.delete("\n\t")
#             descriptionArray << description

            
#             # find the starting date
#             date = object.css('.event-details__data').text.delete("\n\t").split[0..3].join(" ").delete(",")
#             dateArray << date


#             # find the starting time
#             #  Remove the time from Event model

#             # find the starting location
#             locationStartString = object.css('.listing-map-card-street-address').text.delete("\n\t")
#             locationArray << locationStartString


#             # find the starting type

#             dancing_type = []

#             if title.downcase.include? "salsa"
#                 dancing_type << "salsa"

#             elsif title.downcase.include? "bachata"
#                 dancing_type << "bachata"

#             elsif title.downcase.include? "merengue"
#                 dancing_type << "merengue"

#             elsif title.downcase.include? "tango"
#                 dancing_type << "tango"

#             elsif title.downcase.include? "ballroom"
#                 dancing_type << "ballroom"

#             elsif title.downcase.include? "cumbia"
#                 dancing_type << "cumbia"
                
#             elsif title.class == String 
#                 dancing_type << "general"
#             end

#             dancing_typeArray << dancing_type[0]

#             # find the starting price 
#             price = object.css('.js-display-price').text
#             newPrice = price.delete("\n\t")
#             splitIt = newPrice.split
#             priceArray << splitIt[0]

#             # find eventId 

#             eventId << url.split("-")[-1].split("?")[0]
            
#             # find organizer
#             organizer = object.css('.js-d-scroll-to').text.split[1..-4].join(" ")

#             organizerArray << organizer




#             if eventId.size == 5
#                 break
#             end

#         end



#     end

#     # binding.pry
#     createEvents(titleArray, descriptionArray, dateArray, eventId, locationArray, dancing_typeArray, priceArray, imgArray, organizerArray)
# end 

# def createEvents(title, description, date, eventbriteId, location, dancing_type, cost, img, organizer)
    
#     sizeOfArray = title.size - 1
#     numbers = [0..sizeOfArray]


#     for n in numbers
#         Event.create(title: title[n], description: description[n], date: date[n], eventbriteId: eventbriteId[n], location: location[n], dancing_type: dancing_type[n], cost: cost[n], img: img[n], organizer: organizer[n])
#     end

#     p 'done'

# end

# testArrayMultipleDate = ['https://www.eventbrite.com/e/pulse-latin-night-tickets-89497386091?aff=ebdssbdestsearch']
# testArrayOneDate = ['https://www.eventbrite.com/e/i-love-salsa-dance-party-tickets-84809715141?aff=ebdssbdestsearch']
# testArrayFree = ['https://www.eventbrite.com/e/latin-twist-dj-chris-magic-tickets-87905821679?aff=ebdssbdestsearch']
# testArraySoldOut = ['https://www.eventbrite.com/e/ichmyhg?aff=ebdssbdestsearch']



# multipleElements = testArrayMultipleDate  + testArraySoldOut + testArrayOneDate + testArrayFree

# # scrapPages(multipleElements)


# getUrls('https://www.eventbrite.com/d/united-states/salsa-social-dance/?page=', 'eds-media-card-content__action-link')



# # get the 100 links = 5 pages
# # send a request to the first link and get the data I need
# # create certain condition that will prevent the code to crash 

# # binding.pry
