# frozen_string_literal: true

class ShapesController < ApplicationController
  # layout "hello_world"

  def index
    @shapes = { name: "Shapes" }
  end
end
