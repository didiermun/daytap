defmodule Daytap.Repo do
  use Ecto.Repo,
    otp_app: :daytap,
    adapter: Ecto.Adapters.Postgres
end
