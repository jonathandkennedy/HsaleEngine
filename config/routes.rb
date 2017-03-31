Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index1'
  get '/home', to: 'welcome#index'
  post 'results_listing', to: 'welcome#results_listing', as: :search_results

end
