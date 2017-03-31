class WelcomeController < ApplicationController
	def index1
	end

	def index		
	end

	def results_listing
		# default address if nothing found in params
		# http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz19ca2rwxo97_5f91a&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA
		# params[:route] ||= '2114 Bigelow Ave'
		# params[:administrative_area_level_1] ||= 'Seattle, WA'



		
		p address_components = params[:formatted_address].split(',')

		unless params[:locality].present?
			params[:locality] = address_components.second.strip
		end

		unless params[:administrative_area_level_1].present?
		 params[:administrative_area_level_1] = address_components.third.strip
		end


		p citystatezip = params[:locality] << ", " << params[:administrative_area_level_1]


		p '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
		@data = Rubillow::PropertyDetails.deep_search_results({ :address => address_components.first.strip, :citystatezip => citystatezip })

		@search = Rubillow::HomeValuation.search_results({ :address => address_components.first.strip, :citystatezip => citystatezip, rentzestimate: true })
		p '=========================================================='
		# unless @data.code == 0 and @search.code == 0
		# 	@error = true
		# 	p "GOING FROM HERE SETTING ERROR.....................#{@error}"
		# 	flash[:notice] = "Property not found please call this number so we can give you an accurate home estimate " << @data.message
		# 	redirect_to root_url
		# else
				# p @search

				# p "__________________________________________#{ @search.present? } #{@data.present?} #{@property.present?}"
				# # p @search.full_address if @search.present?
				# p @search.zpid
				# p @search.price
				# p @search.last_updated
				# p @search.valuation_range
				# p @search.change
				# p @search.change_duration
				# p @search.percentile
				# # p @search.local_real_estate
				# p @search.region
				# p @search.region_id
				# p @search.region_type
				# p @search.rent_zestimate

				# p @search.local_real_estate[:overview]
				# p '__________________________________________'

				# p @data.full_address
				# p @data.zpid
				# p @data.last_sold_price
				# p @data.last_sold_date
				# p @data.fips_county
				# p @data.tax_assessment_year
				# p @data.tax_assessment
				# p @data.year_built
				# p 'Latitude ' << @data.address[:latitude]
				# p 'Long ' << @data.address[:longitude]

				# p @data.links
				# p '++++++++++++++++++++++++++++++++++++++++++++'
				if @data.code == 0 
					@property = Rubillow::HomeValuation.zestimate({ :zpid => @data.zpid })
					if @property.success?
						
						p '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
					  # p JSON.parse(@property.to_json)
					  p @property.full_address
					  p @property.links
					  p @property.near_limit
						p '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
					end
				end
				@demographics = Rubillow::Neighborhood.demographics({ :state => params[:administrative_area_level_1], :city => params[:locality], :neighborhood => params[:locality] })

				# p '<<<<<<<<<<<<<<< DEMOGRAPHICS >>>>>>>>>>>>>>>>>>>>>'
				p @demographics
				# p '<<<<<<<<<<<<<<< DEMOGRAPHICS END >>>>>>>>>>>>>>>>>>>>>'

				# charts = Rubillow::HomeValuation.chart({ :zpid => @data.zpid, :height => '300', :width => '150', :unit_type => "percent" })
				# if charts.success?
				# 	p '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
				#   # p JSON.parse(@property.to_json)
				#   p @property.charts.to_html
				# 	p '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
					
				# end
			# end
		end
		

end