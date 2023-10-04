/*** onload ***/
	/* triggers */
		if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent)) {
			var on = { click: "touchstart", mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }
		}
		else {
			var on = { click:      "click", mousedown:  "mousedown", mousemove: "mousemove", mouseup:  "mouseup" }
		}

	/* elements */
		var input = document.getElementById("n")
		var outputQualities = document.getElementById("qualities")
		var outputFactors = document.getElementById("factors")
		var message = document.getElementById("message")
		var loading = document.getElementById("loading")

	/* globals */
		var sets = {
			primes: [],
			composites: [],
			antiprimes: [],
			greatestFactorCount: 0,
			fibonacci: [],
			triangles: []
		}

/*** form ***/
	/* submitNumber */
		input.addEventListener("change", submitNumber)
		function submitNumber(event) {
			// get n
				var n = Number(event.target.value)

			// invalid n
				if (!n || isNaN(n) || n % 1 !== 0 || n < 0) {
					outputFactors.innerHTML = ""
					outputQualities.innerHTML = ""
					message.setAttribute("shown", true)
				}

			// loading
				else {
					outputFactors.innerHTML = ""
					outputQualities.innerHTML = ""
					message.removeAttribute("shown")
					loading.setAttribute("rotate", true)

					setTimeout(function() {
						getQualities(n)
					}, 0)
				}
		}

	/* getQualities */
		function getQualities(n) {
			// update sets
				updatePrimes(n)
				updateComposites(n)
				updateAntiprimes(n)
				updateFibonacci(n)
				updateTriangles(n)

			// factors
				var digits = getDigits(n)
				var factors = getFactors(n)
				var primeFactors = getPrimeFactors(n)
			
			// qualities
				var qualities = []

				if (isPrime(n)) {
					qualities.push("<li>PRIME<br>not divisible by any other number</li>")

					if (isEmirp(n, digits)) {
						qualities.push("<li>EMIRP<br>its reverse is also a prime</li>")
					}
				}
				else if (n !== 1) {
					qualities.push("<li>COMPOSITE<br>divisible by other numbers</li>")

					if (isPerfect(n, factors)) {
						qualities.push("<li>PERFECT<br>factors sum to number</li>")
					}
					else if (isAbundant(n, factors)) {
						qualities.push("<li>ABUNDANT<br>factors sum to more than number</li>")
					}
					else {
						qualities.push("<li>DEFICIENT<br>factors sum to less than number</li>")
					}

					if (isOblong(n, factors)) {
						qualities.push("<li>OBLONG<br>product of two consecutive numbers</li>")
					}

					if (isAntiprime(n)) {
						qualities.push("<li>ANTIPRIME<br>more factors than all smaller composites</li>")
					}

					if (isSquare(n)) {
						qualities.push("<li>SQUARE<br>divides into a number times itself</li>")
					}
					if (isCube(n)) {
						qualities.push("<li>CUBE<br>divides into a number times itself times itself</li>")
					}
				}
				else if (n == 1) {
					qualities.push("<li>SQUARE<br>divides into a number times itself</li>")
					qualities.push("<li>CUBE<br>divides into a number times itself times itself</li>")
				}

				if (isPalindrome(n, digits)) {
					qualities.push("<li>PALINDROME<br>digits are the same reversed</li>")
				}
				if (isRepdigit(n, digits)) {
					qualities.push("<li>REPDIGIT<br>number is comprised of repeating digits</li>")
				}
				if (isNarcissistic(n, digits)) {
					qualities.push("<li>NARCISSISTIC<br>the sum of the digits raised to the number length is the number</li>")
				}
				if (isAutomorphic(n, digits)) {
					qualities.push("<li>AUTOMORPHIC<br>appears as the last digit(s) of its square</li>")
				}
				if (isHarshadNiven(n, digits)) {
					qualities.push("<li>HARSHAD-NIVEN<br>divisible by the sum of its digits</li>")
				}

				if (isHappy(n)) {
					qualities.push("<li>HAPPY<br>squaring and adding digits recursively leads to 1</li>")
				}
				if (isFibonacci(n)) {
					qualities.push("<li>FIBONACCI<br>within sequence of numbers that are the sum of 2 preceding numbers</li>")
				}
				if (isTriangle(n)) {
					qualities.push("<li>TRIANGLE</br>represents a triangular array of dots</li>")
				}

			// print
				outputFactors.innerHTML = "<li>FACTORS:<br>" + factors.join(", ") + "</li>" +
					"<br>" +
					"<li>PRIME FACTORS:<br>" + primeFactors.join(" x ") + "</li>"
				outputQualities.innerHTML = qualities.join("<br>")

			// loading
				loading.removeAttribute("rotate")
		}

/*** math - update ***/
	/* updatePrimes */
		function updatePrimes(n) {
			// last prime previously calculated
				var lastPrime = sets.primes.length ? sets.primes[sets.primes.length - 1] : 2

			// check if each number up to n is divisible by any prime
				for (var i = lastPrime; i <= n; i++) {
					var isPrime = true
					for (var p = 0; p < sets.primes.length; p++) {
						if (i % sets.primes[p] == 0) {
							isPrime = false
							p = sets.primes.length
						}
					}
					if (isPrime) {
						sets.primes.push(i)
					}
				}
		}

	/* updateComposites */
		function updateComposites(n) {
			// last composite previously calculated
				var lastComposite = sets.composites.length ? sets.composites[sets.composites.length - 1] : 4

			// all numbers that are not primes are composites
				for (var i = lastComposite; i <= n; i++) {
					if (!sets.primes.includes(i)) {
						sets.composites.push(i)
					}
				}
		}

	/* updateAntiprimes */
		function updateAntiprimes(n) {
			// for every composite number up to n, get its factors
				for (var i = 1; i <= n; i++) {
					if (i <= 2 || !sets.primes.includes(i)) {
						var factors = getFactors(i)

						// if it has more factors than any previous number, add it to the list
							if (factors.length > sets.greatestFactorCount) {
								sets.greatestFactorCount = factors.length
								sets.antiprimes.push(i)
							}
					}
				}
		}

	/* updateFibonacci */
		function updateFibonacci(n) {
			// last fibonacci previously calculated
				if (sets.fibonacci.length < 2) {
					sets.fibonacci = [1, 1]
				}

			// calculate the Fibonacci sequence up to n
				while (sets.fibonacci[sets.fibonacci.length - 1] <= n) {
					sets.fibonacci.push(sets.fibonacci[sets.fibonacci.length - 1] + sets.fibonacci[sets.fibonacci.length - 2])
				}
		}

	/* updateTriangles */
		function updateTriangles(n) {
			// last triangle previously calculated
				if (sets.triangles.length < 2) {
					sets.triangles = [1]
				}

			// calculate all triangles up to n
				while (sets.triangles[sets.triangles.length - 1] <= n) {
					sets.triangles.push(sets.triangles.length * (sets.triangles.length + 1) / 2)
				}
		}

/*** math - get ***/
	/* getDigits */
		function getDigits(n) {
			return String(n).split("").map(function(x) {
				return Number(x)
			})
		}

	/* getFactors */
		function getFactors(n) {
			// factors come in pairs, up to square root
				var root = Math.floor(Math.sqrt(n))
				var factors = []
			
			// check if n divides into each number (including its complement)
				for (var i = 1; i <= root; i++) {
					if (n % i == 0) {
						factors.push(i)
						if (n / i !== i) {
							factors.push(n / i)
						}
					}
				}
			
			// sort factors ascendingly
				factors.sort(function(a, b) { return a - b })
				return factors
		}

	/* getPrimeFactors */
		function getPrimeFactors(n, primeFactors) {
			// use existing primeFactors, if recursive
				var primeFactors = primeFactors || []

			// for each of the primes, check if n divides evenly
				for (var p = 0; p < sets.primes.length; p++) {
					if (n % sets.primes[p] == 0) {
						// if so, add to the list of prime factors
							primeFactors.push(sets.primes[p])

						// then recursively get the prime factors of the remaining dividend
							primeFactors = getPrimeFactors(n / sets.primes[p], primeFactors)
							break
					}
				}

			// return list up a level
				return primeFactors
		}

	/* getUniquePrimeFactors */
		function getUniquePrimeFactors(n) {
			// empty uniquePrimeFactors array
				var uniquePrimeFactors = []

			// for all numbers up to half of n, check if it's a prime that divides into n
				for (var i = 2; i <= n / 2; i++) {
					if (sets.primes.includes(i) && n % i == 0) {
						uniquePrimeFactors.push(i)
					}
				}

			// return data
				return uniquePrimeFactors
		}

/*** math - is ***/
	/* isPrime */
		function isPrime(n) {
			return sets.primes.includes(n)
		}

	/* isAntiprime */
		function isAntiprime(n) {
			return sets.antiprimes.includes(n)
		}

	/* isFibonacci */
		function isFibonacci(n) {
			return sets.fibonacci.includes(n)
		}
	
	/* isPerfect */
		function isPerfect(n, factors) {
			var sum = 0
			for (var i in factors) {
				sum += factors[i]
			}

			return (sum == n * 2)
		}

	/* isAbundant */
		function isAbundant(n, factors) {
			var sum = 0
			for (var i in factors) {
				sum += factors[i]
			}

			return (sum > n * 2)
		}

	/* isTriangle */
		function isTriangle(n) {
			return sets.triangles.includes(n)
		}

	/* isSquare */
		function isSquare(n) {
			return Math.sqrt(n) % 1 == 0
		}

	/* isCube */
		function isCube(n) {
			return Math.cbrt(n) % 1 == 0
		}

	/* isPalindrome */
		function isPalindrome(n, digits) {
			return n == Number(digits.slice().reverse().join(""))
		}

	/* isEmirp */
		function isEmirp(n, digits) {
			var reverse = Number(digits.slice().reverse().join(""))
			if (reverse == n) {
				return false
			}
			else {
				updatePrimes(reverse)
				return sets.primes.includes(reverse)
			}
		}

	/* isHappy */
		function isHappy(n, chain) {
			// no running list? empty array
				var chain = chain || []

			// square each digit...
				var squares = String(n).split("").map(function(x) {
					return Math.pow(Number(x), 2)
				})

			// ...then add them together
				var sum = 0
				for (var i in squares) {
					sum += squares[i]
				}

			// if 1, happy
				if (sum == 1) {
					return true
				}

			// if circle, unhappy
				else if (chain.includes(sum)) {
					return false
				}

			// otherwise, continue
				else {
					chain.push(sum)
					return isHappy(sum, chain)
				}
		}

	/* isNarcissistic */
		function isNarcissistic(n, digits) {
			var sum = 0
			for (var i in digits) {
				sum += Math.pow(digits[i], digits.length)
			}

			return n == sum
		}

	/* isRepdigit */
		function isRepdigit(n, digits) {
			if (digits.length == 1) {
				return false
			}
			else {
				var uniques = []
				for (var i in digits) {
					if (!uniques.includes(digits[i])) {
						uniques.push(digits[i])
					}
				}

				return uniques.length == 1
			}
		}

	/* isAutomorphic */
		function isAutomorphic(n, digits) {
			return n == Number(String(Math.pow(n, 2)).substr(-digits.length))
		}

	/* isHarshadNiven */
		function isHarshadNiven(n, digits) {
			var sum = 0
			for (var i in digits) {
				sum += digits[i]
			}

			return n % sum == 0
		}

	/* isOblong */
		function isOblong(n, factors) {
			for (var i = 1; i < factors.length; i++) {
				if (factors[i] - factors[i - 1] == 1 && factors[i] * factors[i - 1] == n) {
					return true
				}
			}

			return false
		}
