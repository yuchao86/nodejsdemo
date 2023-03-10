
local current_time = tonumber(ARGV[1])
local refill_interval = tonumber(ARGV[2])
local max_bucket_size = tonumber(ARGV[3])
local expire = tonumber(ARGV[4])
local cost = tonumber(ARGV[5])

local last_refill_time = tonumber(redis.call('GET', KEYS[2]))

if (not last_refill_time) then
    local token_count = max_bucket_size - cost
    redis.call('SET', KEYS[1], token_count, 'EX', expire)
    redis.call('SET', KEYS[2], current_time, 'EX', expire)
    return token_count

else
    local token_count = tonumber(redis.call('GET', KEYS[1]))
    if (not token_count) then
        token_count = max_bucket_size
    end

    local elapsed_time = current_time - last_refill_time
    local tokens_to_add = elapsed_time / refill_interval
    token_count = math.min((tokens_to_add + token_count), max_bucket_size) - cost

    if (token_count >= 0) then
        redis.call('SET', KEYS[1], token_count, 'EX', expire)
        redis.call('SET', KEYS[2], current_time, 'EX', expire)
        return token_count
    else

        return tostring(token_count)
    end
end